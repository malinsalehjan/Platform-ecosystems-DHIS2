import React from 'react';
import HistoryTable from './components/HistoryTable/HistoryTable';
import { useDHIS2 } from '../../contexts/DHIS2Context';
import { CircularLoader } from '@dhis2/ui';

export default function HistoryPage() {
  const { loading, error } = useDHIS2();

  return loading ? (
    <CircularLoader />
  ) : error ? (
    <span>An error has occurred ...</span>
  ) : (
    <>
      <h2>History</h2>
      <p>History of all dispensations and replenishments </p>
      <HistoryTable />
    </>
  );
}
