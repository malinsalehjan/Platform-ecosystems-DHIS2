import React from 'react';
import { Menu, MenuItem } from '@dhis2/ui';
import { InventoryIcon, TrainingIcon } from '../../../resources/icons/index';
import { IconClockHistory24, IconExportItems24 } from '@dhis2/ui';

export default function Navigation(props) {
  return (
    <Menu>
      <MenuItem
        label="Inventory"
        active={props.activePage === 'Inventory'}
        onClick={() => props.setActivePage('Inventory')}
        icon={<InventoryIcon />}
      />
      <MenuItem
        label="Replenish"
        active={props.activePage === 'Replenish'}
        onClick={() => props.setActivePage('Replenish')}
        icon={<IconExportItems24 />}
      />
      <MenuItem
        label="History"
        active={props.activePage === 'History'}
        onClick={() => props.setActivePage('History')}
        icon={<IconClockHistory24 />}
      />
      <MenuItem
        label="Training"
        active={props.activePage === 'TrainingPage'}
        onClick={() => props.setActivePage('TrainingPage')}
        icon={<TrainingIcon />}
      />
    </Menu>
  );
}
