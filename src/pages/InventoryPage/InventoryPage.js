import React, { useState, useEffect } from 'react';
import { useDHIS2 } from '../../contexts/DHIS2Context';
import { CircularLoader } from '@dhis2/ui';
import classes from './InventoryPage.module.css';
import DispenseCard from '../../components/DispenseCard/DispenseCard';
import CommodityTable from '../../components/CommodityTable/CommodityTable';
import { daysUntilDelivery } from '../../utility/dateUtility';

export default function InventoryPage() {
  const [selectedCommodity, setSelectedCommodity] = useState(null);

  const { error, loading, commodities } = useDHIS2();

  useEffect(() => {
    setSelectedCommodity(
      commodities.find((commodity) => commodity.id === selectedCommodity?.id),
    );
  }, [commodities]);

  return loading ? (
    <div className={classes.loadingContainer}>
      <CircularLoader />
    </div>
  ) : error ? (
    <span>An error has occured ...</span>
  ) : (
    <div className={classes.container}>
      <div className={classes.details}>
        <span>Current date: {new Date().toLocaleDateString()}</span>
        <span>Days until delivery: {daysUntilDelivery()}</span>
      </div>
      <h2>Inventory</h2>
      <p>Current inventory of stored commodities</p>
      <div className={classes.row}>
        <CommodityTable
          selectedCommodity={selectedCommodity}
          setSelectedCommodity={setSelectedCommodity}
        />
        {selectedCommodity && (
          <DispenseCard
            selectedCommodity={selectedCommodity}
            setSelectedCommodity={setSelectedCommodity}
          />
        )}
      </div>
    </div>
  );
}
