import React from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableRowHead,
  TableCellHead,
} from '@dhis2/ui';
import ReplenishItem from '../ReplenishItem/ReplenishItem';

export default function ReplenishTable({
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
          <TableCellHead>Stock after replenish</TableCellHead>
          <TableCellHead></TableCellHead>
        </TableRowHead>
      </TableHead>
      <TableBody>
        {selectedCommodities.map((item, index) => (
          <ReplenishItem
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
