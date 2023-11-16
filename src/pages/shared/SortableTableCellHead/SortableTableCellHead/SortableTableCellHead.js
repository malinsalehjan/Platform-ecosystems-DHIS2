import React from 'react';
import { TableCellHead } from '@dhis2/ui';
import classes from './SortableTableCellHead.module.css';
import { useDHIS2 } from '../../../../contexts/DHIS2Context';
import { SortUpIcon, SortDownIcon } from '../../../../resources/icons/index';

export default function SortableTableCellHead({ name, displayName }) {
  const { sortBy, sortedBy } = useDHIS2();

  return (
    <TableCellHead>
      <div className={classes.tableColumnHead} onClick={() => sortBy(name)}>
        <span>
          {displayName ?? name}
          {sortedBy.direction === 'ascending' ? (
            <>
              <SortUpIcon disabled={sortedBy.type !== name} />
              <SortDownIcon disabled />
            </>
          ) : (
            <>
              <SortUpIcon disabled />
              <SortDownIcon disabled={sortedBy.type !== name} />
            </>
          )}
        </span>
      </div>
    </TableCellHead>
  );
}
