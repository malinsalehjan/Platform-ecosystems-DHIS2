import React from 'react';
import { Menu, MenuItem } from '@dhis2/ui';

export default function Navigation(props) {
  return (
    <Menu>
      <MenuItem
        label="Inventory"
        active={props.activePage === 'Inventory'}
        onClick={() => props.setActivePage('Inventory')}
      />
      <MenuItem
        label="Refill"
        active={props.activePage === 'Refill'}
        onClick={() => props.setActivePage('Refill')}
      />
      <MenuItem
        label="History"
        active={props.activePage === 'History'}
        onClick={() => props.setActivePage('History')}
      />
    </Menu>
  );
}
