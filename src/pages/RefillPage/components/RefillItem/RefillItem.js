 import React from 'react';
import {
  Input,
  TableCell,
  TableRow,
  DropdownButton,
  FlyoutMenu,
  MenuItem,
  IconEdit16,
  InputField,
  Button,
  IconCross24,
  Tooltip,
} from '@dhis2/ui';
import classes from './RefillItem.module.css';

// A table row in the refill table of the refill page
export default function RefillItem({
  commodities,
  mayDeleteFirstItem,
  deleteItem,
  updateItem,
  item,
  index,
}) {
  return (
    <TableRow>
      <TableCell>
        <DropdownButton
          component={
            <FlyoutMenu>
              {Object.keys(commodities).map((key) => (
                <MenuItem
                  key={key}
                  label={commodities[key].name}
                  onClick={() => {
                    updateItem(index, commodities[key], item.quantity, item.id);
                  }}
                ></MenuItem>
              ))}
            </FlyoutMenu>
          }
        >
          {item.commodity?.name ?? "Select Commodity"}
        </DropdownButton>
      </TableCell>
      <TableCell>{item?.commodity?.quantity ?? ''}</TableCell>
      <TableCell>
    
        <InputField
          type="number"
          min="1"
          disabled={!item.commodity}
          onChange={(event) => {
            updateItem(index, item.commodity, event.value, item.id);
          }}
          placeholder="Select Amount"
          value={item.quantity}
        />
      </TableCell>
      <TableCell>
        {item?.commodity?.quantity && item?.quantity
          ? parseInt(item.commodity.quantity) + parseInt(item.quantity) : ""}
      </TableCell>
      <TableCell>
        <Button
            small
            icon={<IconCross24 />}
            onClick={() => deleteItem(index)}
            className={mayDeleteFirstItem ? undefined : classes.hidden}
          />
      </TableCell>
      
    </TableRow>
  );
}
