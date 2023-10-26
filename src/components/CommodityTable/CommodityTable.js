import React from 'react';
import {
  Table,
  TableRowHead,
  TableHead,
  TableBody,
  TableRow,
  TableCellHead,
  TableCell,
  Button,
} from '@dhis2/ui';
import { RefreshIcon } from '../../resources/icons/icons';
import classes from './CommodityTable.module.css';
import { useDHIS2 } from '../../contexts/DHIS2Context';
import SearchField from './SearchField/SearchField';
import SortableTableCellHead from './SortableTableCellHead/SortableTableCellHead';

export default function CommodityTable({
  selectedCommodity,
  setSelectedCommodity,
}) {
  const { commodities } = useDHIS2();

  function handleClickDispense(id) {
    setSelectedCommodity(commodities.find((commodity) => commodity.id === id));
  }

  return (
    <div className={classes.container}>
      <SearchField />
      {commodities.length === 0 ? (
        <span>Could not find any matching commodities</span>
      ) : (
        <Table>
          <TableHead>
            <TableRowHead>
              <SortableTableCellHead name="name" />
              <SortableTableCellHead name="quantity" />
              <TableCellHead className={classes.rowAction}>
                <Button small>
                  <RefreshIcon />
                </Button>
              </TableCellHead>
            </TableRowHead>
          </TableHead>
          <TableBody>
            {commodities.map((commodity) => (
              <TableRow key={commodity.id}>
                <TableCell>{commodity.name}</TableCell>
                <TableCell>{commodity.quantity}</TableCell>
                <TableCell className={classes.rowAction}>
                  <Button
                    small
                    onClick={() => handleClickDispense(commodity.id)}
                    disabled={commodity === selectedCommodity}
                  >
                    Dispense
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
