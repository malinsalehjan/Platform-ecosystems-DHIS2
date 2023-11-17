import React, { useState, useEffect, createContext, useContext } from 'react';
import { useDataQuery, useDataMutation } from '@dhis2/app-runtime';
import { SortDirection, SortType } from '../types';
import commodityQuery from '../queries/commodityQuery';
import dispenseMutation from '../mutations/dispenseMutation';
import replenishMutation from '../mutations/replenishMutation';
import { useAlert } from '../contexts/AlertContext';
import updateTransactionsMutation from '../mutations/updateTransactionsMutation';
import { getCurrentDateTime } from '../utility/dateUtility';
import updateRecipientsMutation from '../mutations/updateRecipientsMutation';
import currentUserQuery from '../queries/currentUserQuery';
import recipientsQuery from '../queries/recipientsQuery';
import { formatCommodities } from '../utility/commodityUtility';
import {
  createDispenseTransactionDTO,
  createReplenishTransactionDTO,
  formatTransactions,
} from '../utility/transactionUtility';
import trainingModuleData from '../resources/trainingModules/trainingModules';
import { v4 as uuid } from 'uuid';

const DHIS2Context = createContext();

// DHIS2Provider provides the DHIS2 context to all components inside of it
export const DHIS2Provider = ({ children }) => {
  const [commodities, setCommodities] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [sortedBy, setSortedBy] = useState({
    type: SortType.NAME,
    direction: SortDirection.ASCENDING,
  });
  const [trainingModules, setTrainingModules] = useState(
    trainingModuleData.map((module) => ({
      id: module.id,
      content: module,
      isComplete: false,
      totalImages: module.images.length,
    })),
  );
  const [trainingModeEnabled, setTrainingModeEnabled] = useState(false);
  const [displayTrainingModeSuggestion, setDisplayTrainingModeSuggestion] =
    useState(false);

  function finishModule(moduleId) {
    const module = trainingModules.find((module) => module.id === moduleId);
    module.isComplete = true;
    setTrainingModules([...trainingModules]);
  }

  useEffect(() => {
    if (trainingModules.every((module) => module.isComplete)) {
      setDisplayTrainingModeSuggestion(true);
    }
  }, [trainingModules]);

  function doNotSuggestTrainingModeAgain() {
    setDisplayTrainingModeSuggestion(false);
  }

  const { error, loading, data, refetch } = useDataQuery(commodityQuery);
  const { data: userData } = useDataQuery(currentUserQuery);
  const { data: recipientsData, refetch: refetchRecipients } =
    useDataQuery(recipientsQuery);

  const [dispense] = useDataMutation(dispenseMutation);
  const [replenish] = useDataMutation(replenishMutation);
  const [updateTransactions] = useDataMutation(updateTransactionsMutation);
  const [updateRecipients] = useDataMutation(updateRecipientsMutation);

  const { addAlert } = useAlert();

  // When data is received, format it and update commodities and transactions accordingly
  useEffect(() => {
    if (data) {
      const commodities = formatCommodities(data, keyword, sortedBy);
      setCommodities(commodities);

      const transactions = formatTransactions(
        data.transactions.transactions,
        keyword,
        sortedBy,
      );
      setTransactions(transactions);
    }
  }, [keyword, sortedBy, loading, data]);

  useEffect(() => {
    if (recipientsData) setRecipients(recipientsData?.recipients.recipients);
  }, [recipientsData]);

  async function dispenseCommodity(commodityId, amount, recipient, datetime) {
    const commodity = commodities.find(
      (commodity) => commodity.id === commodityId,
    );

    if (trainingModeEnabled) {
      setCommodities(
        commodities.map((commodity) => {
          if (commodity.id === commodityId) {
            return {
              ...commodity,
              quantity: parseInt(commodity.quantity) - amount,
              consumption: parseInt(commodity.consumption) + amount,
            };
          }
          return commodity;
        }),
      );

      setTransactions([
        {
          id: uuid(),
          type: 'out',
          amount: amount,
          datetime: datetime,
          commodity: commodity.name,
          recipient: recipient,
          dispensedBy: userData?.me?.displayName ?? 'Unknown',
        },
        ...transactions,
      ]);

      addAlert('Dispensed commodity successfully', 'success');
    } else {
      // Calculate what the new quantity and consumed amount should be
      const newQuantity = parseInt(commodity.quantity) - amount;
      const newConsumedAmount = parseInt(commodity.consumption) + amount;

      try {
        const response = await dispense({
          elementId: commodityId,
          newQuantity,
          newConsumedAmount,
        });

        // Update the Datastore with the updated transactions list
        await updateTransactions(
          createDispenseTransactionDTO(
            commodity.name,
            amount,
            userData?.me?.displayName ?? 'Unknown',
            recipient,
            datetime,
            data.transactions.transactions,
          ),
        );

        // If recipient is new, update the Datastore with the updated recipients list
        if (
          !recipientsData?.recipients.recipients.includes(
            recipient.toLowerCase().trim(),
          )
        ) {
          await updateRecipients({
            recipients: [
              recipient.toLowerCase().trim(),
              ...recipientsData?.recipients.recipients,
            ],
          });
        }

        if (response.status === 'OK') {
          addAlert(`Dispensed ${commodity.name} successfully`, 'success');
        } else {
          addAlert('Failed to dispense commodity', 'critical');
        }
        refetch();
        refetchRecipients();
      } catch (error) {
        addAlert('Failed to dispense commodity', 'critical');
      }
    }
  }

  async function replenishCommodities(commodityQuantityPairs) {
    if (trainingModeEnabled) {
      setCommodities(
        commodities.map((commodity) => {
          const pair = commodityQuantityPairs.find(
            (pair) => pair.commodity.id === commodity.id,
          );

          if (pair) {
            return {
              ...commodity,
              quantity: parseInt(commodity.quantity) + parseInt(pair.quantity),
            };
          }
          return commodity;
        }),
      );

      setTransactions([
        {
          id: uuid(),
          type: 'in',
          datetime: getCurrentDateTime(),
          commodities: commodityQuantityPairs.map(({ commodity, quantity }) => {
            return {
              name: commodity.name,
              quantity: parseInt(quantity),
            };
          }),
        },
        ...transactions,
      ]);

      addAlert(`Succesfully replenished commodities`, 'success');
    } else {
      const idQuantityPairs = commodityQuantityPairs.map((pair) => {
        const { commodity, quantity } = pair;

        return {
          id: commodity.id,
          quantity: parseInt(commodity.quantity) + parseInt(quantity),
        };
      });

      try {
        const response = await replenish({
          idQuantityPairs,
        });

        const nameQuantityPairs = commodityQuantityPairs.map(
          ({ commodity, quantity }) => {
            return {
              name: commodity.name,
              quantity: parseInt(quantity),
            };
          },
        );

        console.log('name pairs:', nameQuantityPairs);

        // Update the Datastore with the updated transactions list
        const DTO = createReplenishTransactionDTO(
          nameQuantityPairs,
          getCurrentDateTime(),
          data.transactions.transactions,
        );

        console.log('bruh');
        console.log('DTO', DTO);

        await updateTransactions(DTO);

        if (response.status === 'OK') {
          addAlert(`Succesfully replenished commodities`, 'success');
        } else {
          addAlert(`Failed to replenished commodities`, 'critical');
        }
        refetch();
        refetchRecipients();
      } catch (error) {
        addAlert(`Failed to replenished commodities`, 'critical');
      }
    }
  }

  async function deleteRecipient(recipientToBeRemoved) {
    const newRecipients = recipientsData?.recipients.recipients.filter(
      (recipient) => recipient !== recipientToBeRemoved,
    );

    if (trainingModeEnabled) {
      addAlert(
        `Removed ${recipientToBeRemoved} from suggestion list successfully`,
        'success',
      );
      refetch();
    } else {
      try {
        const response = await updateRecipients({
          recipients: newRecipients,
        });

        if (response.status === 'OK') {
          addAlert(
            `Removed ${recipientToBeRemoved} from suggestion list successfully`,
            'success',
          );
          refetch();
        } else {
          addAlert(
            `Failed to remove ${recipientToBeRemoved} from suggestion list`,
            'critical',
          );
        }
      } catch (error) {
        addAlert(
          `Failed to remove ${recipientToBeRemoved} from suggestion list`,
          'critical',
        );
      }
    }
  }

  // Set what type (e.g. name, quantity) to sort the commodities by
  function sortBy(type, newDirection) {
    // If the type is the same as before, toggle the sort direction (ascending/descending)
    const direction = newDirection
      ? newDirection
      : type === sortedBy.type
        ? sortedBy.direction === SortDirection.ASCENDING
          ? SortDirection.DESCENDING
          : SortDirection.ASCENDING
        : SortDirection.ASCENDING;
    setSortedBy({ type, direction });
  }

  return (
    <DHIS2Context.Provider
      // Values to be passed to the components that uses the useDHIS2 hook or the DHIS2Context
      value={{
        error,
        loading,
        commodities,
        sortBy,
        sortedBy,
        searchForCommodity: setKeyword,
        dispenseCommodity,
        replenishCommodities,
        refetch,
        recipients,
        deleteRecipient,
        refetchRecipients,
        transactions,
        trainingModeEnabled,
        setTrainingModeEnabled,
        trainingModules,
        setTrainingModules,
        finishModule,
        displayTrainingModeSuggestion,
        doNotSuggestTrainingModeAgain,
      }}
    >
      {children}
    </DHIS2Context.Provider>
  );
};
// Simple custom hook to easily access the context from anywhere inside the DHIS2Provider
export const useDHIS2 = () => {
  const context = useContext(DHIS2Context);
  if (context === undefined) {
    throw new Error('useDHIS2 must be used within a DHIS2Provider');
  }
  return context;
};
