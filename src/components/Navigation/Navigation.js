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
        label="Transactions"
        active={props.activePage === 'Transactions'}
        onClick={() => props.activePageHandler('Transactions')}
      />
    </Menu>
  );
}