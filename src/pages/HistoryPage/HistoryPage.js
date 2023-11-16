import React from 'react';
import HistoryTable from './components/HistoryTable/HistoryTable';

export default function HistoryPage() {
  return (
    <>
      <h2>History</h2>
      <p>Log of all activities </p>
      <HistoryTable />
    </>
  );
}
