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
        label="Replenish"
        active={props.activePage === 'Replenish'}
        onClick={() => props.setActivePage('Replenish')}
      />
      <MenuItem
        label="History"
        active={props.activePage === 'History'}
        onClick={() => props.setActivePage('History')}
      />
      <MenuItem
        label="Training page"
        active={props.activePage === 'TrainingPage'}
        onClick={() => props.setActivePage('TrainingPage')}
      />
    </Menu>
  );
}
