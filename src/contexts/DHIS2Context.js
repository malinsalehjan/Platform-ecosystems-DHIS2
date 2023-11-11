import React, { useState, useEffect, createContext, useContext } from 'react';
import { useDataQuery, useDataMutation } from '@dhis2/app-runtime';
import { SortDirection, SortType } from '../types';
import commodityQuery from '../queries/commodityQuery';
import dispenseMutation from '../mutations/dispenseMutation';
import { useAlert } from '../contexts/AlertContext';
import updateTransactionsMutation from '../mutations/updateTransactionsMutation';
import currentUserQuery from '../queries/currentUserQuery';
import { formatCommodities } from '../utility/commodityUtility';

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

  const [dispense] = useDataMutation(dispenseMutation);
  const [updateTransactions] = useDataMutation(updateTransactionsMutation);

  // When data is received, format it and update commodities accordingly
  useEffect(() => {
    console.log("hello");
    if (data) {
      const commodities = formatCommodities(data, keyword, sortedBy);
      setCommodities(commodities);
    }
  }, [keyword, sortedBy, loading, data]);

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
          ...data.transactions.transactions,
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

      if (response.status === 'OK') {
        addAlert('Dispensed commodity successfully', 'success');
        refetch();
      } else {
        addAlert('Failed to dispense commodity', 'critical');
      }
    } catch (error) {
      console.error(error);
      addAlert('Failed to dispense commodity', 'critical');
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
        refetch,
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
