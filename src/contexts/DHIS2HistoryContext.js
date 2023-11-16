import React, { createContext, useContext, useEffect } from 'react';
import { request } from '../queries/transactionDataQueries';
import { useDataQuery } from '@dhis2/app-runtime';

const DHIS2HistoryContext = createContext();

export const DHIS2HistoryProvider = ({ children }) => {
  const { error, loading, data } = useDataQuery(request);

  useEffect(() => {}, [data]);

  return (
    <DHIS2HistoryContext.Provider
      value={{
        error,
        loading,
        data,
      }}
    >
      {children}
    </DHIS2HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(DHIS2HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within an HistoryProvider');
  }
  return context;
};
