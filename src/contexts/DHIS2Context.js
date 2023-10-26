import React, { useState, useEffect, createContext, useContext } from 'react';
import { useDataQuery } from '@dhis2/app-runtime';
import { TransactionType, SortDirection, SortType } from '../types';
import { commodityQuery } from '../queries';

const DHIS2Context = createContext();

// DHIS2Provider provides the DHIS2 context to all components inside of it
export const DHIS2Provider = ({ children }) => {
  const [keyword, setKeyword] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [sortedBy, setSortedBy] = useState({
    type: SortType.NAME,
    direction: SortDirection.ASCENDING,
  });

  const { error, loading, data } = useDataQuery(commodityQuery);

  useEffect(() => {
    if (data) {
      // Extract the list of commodity details from the data
      const commodities = data.dataSet.dataSetElements.map((commodity) => {
        return {
          ...commodity.dataElement,
          displayName: commodity.dataElement.displayName.split('-')[1].trim(),
        };
      });

      // Extract the list of commodities to be displayed
      const endTransactions = data.dataValueSets.dataValues

        // Filter out anything that is not an end balance entry
        .filter((dataValue) => {
          return dataValue.categoryOptionCombo === TransactionType.END_BALANCE;
        })

        // Format the data for easier use
        .map((dataValue) => {
          const commodity = commodities.find(
            (commodity) => commodity.id === dataValue.dataElement,
          );

          return {
            id: commodity.id,
            name: commodity.displayName,
            quantity: dataValue.value,
          };
        })

        // Apply keyword filtering from search field
        .filter((commodity) => {
          return commodity.name.toLowerCase().includes(keyword.toLowerCase());
        })

        // Sort list based on the selected sort type and direction
        .sort((a, b) => {
          let result = 0;
          if (sortedBy.type === SortType.NAME) {
            result = a.name.localeCompare(b.name);
          } else if (sortedBy.type === SortType.QUANTITY) {
            result = a.quantity - b.quantity;
          }

          if (sortedBy.direction === SortDirection.DESCENDING) {
            result *= -1;
          }

          return result;
        });

      setTransactions(endTransactions);
    }
  }, [keyword, sortedBy, loading, data]);

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

  function searchForCommodity(keyword) {
    setKeyword(keyword);
  }

  return (
    <DHIS2Context.Provider
      // Values to be passed to the components that uses the useDHIS2 hook or the DHIS2Context
      value={{
        error,
        loading,
        commodities: transactions,
        sortBy,
        sortedBy,
        searchForCommodity,
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
