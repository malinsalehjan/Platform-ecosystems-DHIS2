import React, { useState, useEffect } from 'react';
import { useDHIS2 } from '../../contexts/DHIS2Context';
import { CircularLoader, InputField } from '@dhis2/ui';
import classes from './InventoryPage.module.css';
import { Search } from '../../resources/icons/icons';
import DispenseCard from '../../components/DispenseCard/DispenseCard';
import CommodityTable from '../../components/CommodityTable/CommodityTable';
import { daysUntilDelivery } from '../../utility/daysUntilDelivery';

export default function InventoryPage() {
  const [selectedCommodity, setSelectedCommodity] = useState(null);

  const { error, loading } = useDHIS2();

  return loading ? (
    <CircularLoader />
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
