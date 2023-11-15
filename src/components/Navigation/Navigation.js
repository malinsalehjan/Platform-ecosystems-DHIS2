import React from 'react';
import { Menu, MenuItem } from '@dhis2/ui';

export default function Navigation(props) {
  return (
    <Menu>
      <MenuItem
        label="Inventory"
        active={props.activePage === 'Inventory'}
        onClick={() => props.activePageHandler('Inventory')}
      />
      <MenuItem
        label="Refill"
        active={props.activePage === 'Refill'}
        onClick={() => props.activePageHandler('Refill')}
      />
    </Menu>
  );
}
