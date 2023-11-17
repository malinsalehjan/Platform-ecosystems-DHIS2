import React, { useState, useEffect, createContext, useContext } from 'react';
import { useDataQuery, useDataMutation } from '@dhis2/app-runtime';
import { SortDirection, SortType } from '../types';
import commodityQuery from '../queries/commodityQuery';
import dispenseMutation from '../mutations/dispenseMutation';
import refillMutation from '../mutations/refillMutation';
import { useAlert } from '../contexts/AlertContext';
import updateTransactionsMutation from '../mutations/updateTransactionsMutation';
import { getCurrentDateTime } from '../utility/dateUtility';
import updateRecipientsMutation from '../mutations/updateRecipientsMutation';
import currentUserQuery from '../queries/currentUserQuery';
import recipientsQuery from '../queries/recipientsQuery';
import { formatCommodities } from '../utility/commodityUtility';
import {
  createDispenseTransactionDTO,
  createRefillTransactionDTO,
  formatTransactions,
} from '../utility/transactionUtility';

const DHIS2Context = createContext();

// DHIS2Provider provides the DHIS2 context to all components inside of it
export const DHIS2Provider = ({ children }) => {
  const [commodities, setCommodities] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [sortedBy, setSortedBy] = useState({
    type: SortType.NAME,
    direction: SortDirection.ASCENDING,
  });
  const [sandboxEnabled, setSandboxEnabled] = useState(false);

  const { error, loading, data, refetch } = useDataQuery(commodityQuery);
  const { data: userData } = useDataQuery(currentUserQuery);
  const { data: recipientsData, refetch: refetchRecipients } =
    useDataQuery(recipientsQuery);

  const [dispense] = useDataMutation(dispenseMutation);
  const [refill] = useDataMutation(refillMutation);
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

  function checkIfRecipientExist(recipient) {
    for (const element of recipientsData?.Recipients.recipients) {
      if (element.recipient === recipient) {
        return true;
      }
    }
    return false;
  }

  async function dispenseCommodity(commodityId, amount, recipient, datetime) {
    if (sandboxEnabled) {
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
      addAlert('Dispensed commodity successfully', 'success');
    } else {
      const commodity = commodities.find(
        (commodity) => commodity.id === commodityId,
      );

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

        if (!checkIfRecipientExist(recipient)) {
          // Update the Datastore with the updated recipients list
          await updateRecipients({
            recipients: [
              ...recipientsData?.Recipients.recipients,
              {
                recipient: recipient,
              },
            ],
          });
        }

        if (response.status === 'OK') {
          addAlert('Dispensed commodity successfully', 'success');
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

  async function refillCommodity(commodityId, amount) {
    const commodity = commodities.find(
      (commodity) => commodity.id === commodityId,
    );

    // Calculate what the new quantity should be
    const newQuantity = parseInt(commodity.quantity) + amount;

    try {
      const response = await refill({
        elementId: commodityId,
        newQuantity,
      });

      // Update the Datastore with the updated transactions list
      await updateTransactions(
        createRefillTransactionDTO(
          commodity.name,
          amount,
          getCurrentDateTime(),
          data.transactions.transactions,
        ),
      );

      if (response.status === 'OK') {
        addAlert(`Succesfully refilled ${commodity.name}`, 'success');
      } else {
        addAlert(`Failed to refill ${commodity.name}`, 'critical');
      }
      refetch();
      refetchRecipients();
    } catch (error) {
      addAlert(`Failed to refill ${commodity.name}`, 'critical');
    }
  }

  async function deleteRecipient(recipientToBeRemoved) {
    const newRecipients = recipientsData?.recipients.recipients.filter(
      (recipient) => recipient !== recipientToBeRemoved,
    );

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
        refillCommodity,
        refetch,
        recipientsData,
        deleteRecipient,
        refetchRecipients,
        transactions,
        sandboxEnabled,
        setSandboxEnabled,
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
