import React, { useState } from 'react';
import { useDHIS2 } from '../../contexts/DHIS2Context';
import {
  CircularLoader,
  Table,
  TableBody,
  TableHead,
  TableRowHead,
  TableCellHead,
  Button,
  IconAdd24,
  Tooltip,
} from '@dhis2/ui';
import classes from './RefillPage.module.css';
import RefillItem from './components/RefillItem/RefillItem';
import { getCurrentDate } from '../../utility/dateUtility';

// MAIN COMPONENT FOR COMMODITY REFILL
/* Commodity refill works through updating useState 'order' with new additions and changes 
stemming from children of type Refillitem, which are displayed inside a table. Changes to 
'order' trigger rerenders. */
export default function RefillPage() {
  const [orderItems, setOrderItems] = useState([
    { commodity: null, quantity: 0 },
  ]);
  const [loadingArtificially, setLoadingArtificially] = useState(false);
  const [refillButtonState, setRefillButtonState] = useState(false);
  const { error, loading, commodities, refillCommodity } = useDHIS2();

  const addItem = () => {
    setOrderItems([...orderItems, { commodity: undefined, quantity: 1 }]);
  };

  const updateItem = (index, commodity, quantity) => {
    let newItems = orderItems;
    newItems[index] = { commodity, quantity };
    setOrderItems([...newItems]);
    setRefillButtonState(true);
  };

  const deleteItem = (index) => {
    let newItems = orderItems;
    newItems.splice(index, 1);
    setOrderItems([...newItems]);
  };

  const clearItems = () => {
    setOrderItems([{ id: 0, commodity: null, quantity: 1 }]);
    setRefillButtonState(false);
  };

  const handleRefill = () => {
    setLoadingArtificially(true);

    for (const item of orderItems) {
      if (item.commodity !== undefined && item.quantity !== 0) {
        refillCommodity(
          item.commodity.id,
          parseInt(item.quantity),
          getCurrentDate(),
        );
      }
    }
    clearItems();
    setTimeout(function () {
      setLoadingArtificially(false);
    }, 2000);
  };

  const nonSelectedCommodities = commodities.filter(
    (commodity) =>
      !orderItems.find((item) => item.commodity?.id === commodity.id),
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
      <Table>
        <TableHead>
          <TableRowHead>
            <TableCellHead>Commodity</TableCellHead>
            <TableCellHead>Current stock</TableCellHead>
            <TableCellHead>Select Amount</TableCellHead>
            <TableCellHead>Stock after refill</TableCellHead>
            <TableCellHead></TableCellHead>
          </TableRowHead>
        </TableHead>
        <TableBody suppressZebraStriping>
          {orderItems.map((item, index) => (
            <RefillItem
              commodities={nonSelectedCommodities}
              mayDeleteFirstItem={orderItems.length > 1}
              key={`item-${index}`}
              deleteItem={deleteItem}
              updateItem={updateItem}
              item={item}
              index={index}
            />
          ))}
        </TableBody>
      </Table>
      <div className={classes.actions}>
        <Tooltip content="Add Commodity" placement="right">
          <Button small icon={<IconAdd24 />} onClick={addItem} />
        </Tooltip>
        <div>
          {refillButtonState && (
            <>
              <Button
                primary
                large
                loading={loadingArtificially}
                onClick={() => handleRefill()}
              >
                Confirm Refill
              </Button>

              <Button
                onClick={() => clearItems()}
                loading={loadingArtificially}
                large
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
      {loadingArtificially && <h3>Refilling commodities, please wait ...</h3>}
    </div>
  );
}
