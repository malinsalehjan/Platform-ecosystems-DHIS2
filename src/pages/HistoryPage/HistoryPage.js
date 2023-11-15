import React from 'react';
import { CircularLoader } from '@dhis2/ui';
import classes from './HistoryPage.module.css';
import HistoryTable from '../../components/HistoryTable/HistoryTable';
import { daysUntilDelivery } from '../../utility/dateUtility';
import { useHistory } from '../../contexts/DHIS2HistoryContext';

export default function HistoryPage() {
  const { loading, error } = useHistory();

  return loading ? (
    <CircularLoader />
  ) : error ? (
    <span>An error has occured ...</span>
  ) : (
    <div className={classes.container}>
      <h2>History</h2>
      <p>Log of all activities </p>
      <div className={classes.row}>
        <HistoryTable />
      </div>
    </div>
  );
}
