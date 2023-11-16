import React from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableRowHead,
  TableCellHead,
} from '@dhis2/ui';
import RefillItem from '../RefillItem/RefillItem';

export default function RefillTable({
  selectedCommodities,
  nonSelectedCommodities,
  update,
  remove,
  mayRemoveFirstCommodity,
}) {
  return (
    <Table>
      <TableHead>
        <TableRowHead>
          <TableCellHead>Commodity</TableCellHead>
          <TableCellHead>Current stock</TableCellHead>
          <TableCellHead>Received amount</TableCellHead>
          <TableCellHead>Stock after refill</TableCellHead>
          <TableCellHead></TableCellHead>
        </TableRowHead>
      </TableHead>
      <TableBody>
        {selectedCommodities.map((item, index) => (
          <RefillItem
            commodities={nonSelectedCommodities}
            mayRemoveFirstCommodity={mayRemoveFirstCommodity}
            key={`item-${index}`}
            remove={remove}
            update={update}
            item={item}
            index={index}
          />
        ))}
      </TableBody>
    </Table>
  );
}
