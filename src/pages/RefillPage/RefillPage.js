import React, { useState } from 'react';
import { useDHIS2 } from '../../contexts/DHIS2Context';
import { CircularLoader, Button, IconAdd24 } from '@dhis2/ui';
import classes from './RefillPage.module.css';
import { getCurrentDate } from '../../utility/dateUtility';
import RefillTable from './components/RefillTable/RefillTable';

export default function RefillPage() {
  const [selectedCommodities, setSelectedCommodities] = useState([
    { commodity: null, quantity: 0 },
  ]);
  const [loadingArtificially, setLoadingArtificially] = useState(false);
  const [enableButton, setEnableButton] = useState(false);
  const { error, loading, commodities, refillCommodity } = useDHIS2();

  const addCommodity = () => {
    setSelectedCommodities([
      ...selectedCommodities,
      { commodity: undefined, quantity: 1 },
    ]);
  };

  const updateCommodity = (index, commodity, quantity) => {
    let newItems = selectedCommodities;
    newItems[index] = { commodity, quantity };
    setSelectedCommodities([...newItems]);
    setEnableButton(true);
  };

  const removeCommodity = (index) => {
    let newItems = selectedCommodities;
    newItems.splice(index, 1);
    setSelectedCommodities([...newItems]);
  };

  const clearCommodities = () => {
    setSelectedCommodities([{ id: 0, commodity: null, quantity: 1 }]);
    setEnableButton(false);
  };

  const handleRefill = () => {
    setLoadingArtificially(true);

    for (const item of selectedCommodities) {
      if (item.commodity !== undefined && item.quantity !== 0) {
        refillCommodity(
          item.commodity.id,
          parseInt(item.quantity),
          getCurrentDate(),
        );
      }
    }
    clearCommodities();
    setTimeout(function () {
      setLoadingArtificially(false);
    }, 2000);
  };

  const nonSelectedCommodities = commodities.filter(
    (commodity) =>
      !selectedCommodities.find((item) => item.commodity?.id === commodity.id),
  );

  return loading ? (
    <CircularLoader />
  ) : error ? (
    <span>An error has occured ...</span>
  ) : (
    <div>
      <h2>Refill</h2>
      <p>
        Select commodities and provide amounts to refill. For guidance on
        refilling, please visit the Sandbox tab.
      </p>
      <RefillTable
        nonSelectedCommodities={nonSelectedCommodities}
        selectedCommodities={selectedCommodities}
        update={updateCommodity}
        remove={removeCommodity}
        mayRemoveFirstCommodity={selectedCommodities.length > 1}
      />
      <div className={classes.actions}>
        <Button icon={<IconAdd24 />} onClick={addCommodity}>
          Add commodity
        </Button>
        <div>
          <Button
            primary
            loading={loadingArtificially}
            onClick={() => handleRefill()}
            disabled={!enableButton}
          >
            Confirm refill
          </Button>

          <Button
            onClick={() => clearCommodities()}
            loading={loadingArtificially}
          >
            Cancel
          </Button>
        </div>
      </div>
      {loadingArtificially && <h3>Refilling commodities, please wait ...</h3>}
    </div>
  );
}
