import React from 'react';
import {
  TableCell,
  TableRow,
  DropdownButton,
  FlyoutMenu,
  MenuItem,
  InputField,
  Button,
  IconCross24,
} from '@dhis2/ui';
import classes from './RefillItem.module.css';

// A table row in the refill table of the refill page
export default function RefillItem({
  commodities,
  mayRemoveFirstCommodity,
  remove,
  update,
  item,
  index,
}) {
  return (
    <TableRow className={classes.row}>
      <TableCell>
        <DropdownButton
          component={
            <FlyoutMenu>
              {Object.keys(commodities).map((key) => (
                <MenuItem
                  key={key}
                  label={commodities[key].name}
                  onClick={() => {
                    update(index, commodities[key], item.quantity, item.id);
                  }}
                ></MenuItem>
              ))}
            </FlyoutMenu>
          }
        >
          {item.commodity?.name ?? 'Select Commodity'}
        </DropdownButton>
      </TableCell>
      <TableCell>{item?.commodity?.quantity ?? ''}</TableCell>
      <TableCell>
        <InputField
          className={classes.amountInput}
          type="number"
          min="1"
          disabled={!item.commodity}
          onChange={(event) => {
            update(index, item.commodity, event.value, item.id);
          }}
          placeholder="Select Amount"
          value={item.quantity}
        />
      </TableCell>
      <TableCell>
        {item?.commodity?.quantity && item?.quantity
          ? parseInt(item.commodity.quantity) + parseInt(item.quantity)
          : ''}
      </TableCell>
      <TableCell>
        <Button
          small
          icon={<IconCross24 />}
          onClick={() => remove(index)}
          className={mayRemoveFirstCommodity ? undefined : classes.hidden}
        />
      </TableCell>
    </TableRow>
  );
}
