import React, { useState, useEffect, createContext, useContext } from 'react';
import { useDataQuery, useDataMutation } from '@dhis2/app-runtime';
import { SortDirection, SortType } from '../types';
import commodityQuery from '../queries/commodityQuery';
import dispenseMutation from '../mutations/dispenseMutation';
import refillMutation from '../mutations/refillMutation';
import { useAlert } from '../contexts/AlertContext';
import updateTransactionsMutation from '../mutations/updateTransactionsMutation';
import {
  getCurrentDate,
  getCurrentDateTime,
  getTimeStamp,
} from '../utility/dateUtility';
import updateRecipientsMutation from '../mutations/updateRecipientsMutation';
import currentUserQuery from '../queries/currentUserQuery';
import recipientsQuery from '../queries/recipientsQuery';
import { formatCommodities } from '../utility/commodityUtility';
import { v4 as uuid } from 'uuid';

const DHIS2Context = createContext();

// DHIS2Provider provides the DHIS2 context to all components inside of it
export const DHIS2Provider = ({ children }) => {
  const [keyword, setKeyword] = useState('');
  const [commodities, setCommodities] = useState([]);
  const [sortedBy, setSortedBy] = useState({
    type: SortType.NAME,
    direction: SortDirection.ASCENDING,
  });

  const { addAlert } = useAlert();

  const { error, loading, data, refetch } = useDataQuery(commodityQuery);
  const { data: userData } = useDataQuery(currentUserQuery);
  const { data: recipientsData, refetch: refetchRecipients } = useDataQuery(recipientsQuery);

  const [dispense] = useDataMutation(dispenseMutation);
  const [refill] = useDataMutation(refillMutation);
  const [updateTransactions] = useDataMutation(updateTransactionsMutation);
  const [updateRecipients] = useDataMutation(updateRecipientsMutation);

  // When data is received, format it and update commodities accordingly
  useEffect(() => {
    if (data) {
      const commodities = formatCommodities(data, keyword, sortedBy);
      setCommodities(commodities);
    }
  }, [keyword, sortedBy, loading, data]);

  function checkIfRecipientExist(recipient){

    for (const element of recipientsData?.Recipients.recipients) {
      if (element.recipient === recipient) {
        return true;
      }
    }
    return false;
  }

  async function dispenseCommodity(commodityId, amount, recipient, date) {
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
      await updateTransactions({
        transactions: [
          ...data.transactions,
          {
            commodityId: commodity.id,
            commodity: commodity.name,
            amount: amount,
            dispensedBy: userData?.me?.displayName ?? 'Unknown',
            dispensedTo: recipient,
            date: date,
          },
        ],
      });
      
      if(!checkIfRecipientExist(recipient)){
        // Update the Datastore with the updated recipients list
        await updateRecipients({
          recipients: [
            ...recipientsData?.Recipients.recipients,
            {
              recipient: recipient 
            },
          ],
        });
      }

      if (response.status === 'OK') {
        addAlert('Dispensed commodity successfully', 'success');
        refetchRecipients();
      } else {
        addAlert('Failed to dispense commodity', 'critical');
      }
    } catch (error) {
      addAlert('Failed to dispense commodity', 'critical');
    }
  }

  async function refillCommodity(commodityId, amount) {
    const commodity = commodities.find(
      (commodity) => commodity.id === commodityId,
    );

    // Calculate what the new quantity should be
    const newQuantity = parseInt(commodity.quantity) + amount;

    try {
      await refill({
        elementId: commodityId,
        newQuantity,
      });

      // Update the Datastore with the updated transactions list
      await updateTransactions({
        transactions: [
          ...data.transactions.transactions,
          {
            id: uuid(),
            type: 'in',
            commodityId: commodity.id,
            commodity: commodity.name,
            amount: amount,
            datetime: getCurrentDateTime(),
          },
        ],
      });

      addAlert(`Succesfully refilled ${commodity.name}`, 'success');
      refetch();
    } catch (error) {
      addAlert(`Failed to refill ${commodity.name}`, 'critical');
    }
  }
  
  function findIndexToRemove(toBeRemoved){
    const foundRecipient = recipientsData?.Recipients.recipients.find((element) => {
      return element.recipient === toBeRemoved;
    });
  
    if (foundRecipient) {
      const indexToBeRemoved = recipientsData?.Recipients.recipients.indexOf(foundRecipient);
      return indexToBeRemoved;
    }

    return -1;
  }
  
  async function deleteRecipient(toBeRemoved){    
    const index = findIndexToRemove(toBeRemoved);
    let newArray = recipientsData?.Recipients.recipients.slice(0, index).concat(recipientsData?.Recipients.recipients.slice(index + 1));

    try{
      const response = await updateRecipients({
        recipients: [
          ...newArray,
        ],
      });

      if (response.status === 'OK') {
        addAlert('Deletet recipient', 'success');
        refetch();
      } else {
        addAlert('Failed to delete recipient', 'critical');
      }
    }catch(error){
      addAlert('Failed to delete recipient', 'critical');
    }
  }

  // Set what type (e.g. name, quantity) to sort the commodities by
  function sortBy(type) {
    // If the type is the same as before, toggle the sort direction (ascending/descending)
    const direction =
      type === sortedBy.type
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

