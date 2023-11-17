import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableRowHead,
  TableRow,
  TableCell,
  DropdownButton,
  FlyoutMenu,
  MenuItem,
  Pagination,
  TableBody,
} from '@dhis2/ui';
import classes from './HistoryTable.module.css';
import SortableTableCellHead from '../../../shared/SortableTableCellHead/SortableTableCellHead/SortableTableCellHead';
import { useDHIS2 } from '../../../../contexts/DHIS2Context';
import { capitalizeName } from '../../../../utility/nameUtility';
import SearchField from '../../../shared/SearchField/SearchField';
import { SortDirection } from '../../../../types';
import { TableCellHead } from '@dhis2-ui/table';

export default function HistoryTable() {
  const [selectedLabel, setSelectedLabel] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 13;

  const { transactions, sortBy } = useDHIS2();
  console.log(transactions);

  const [totalSize, setTotalSize] = useState(transactions.length);
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const [numOfPages, setNumOfPages] = useState(Math.ceil(totalSize / pageSize));

  const filteredRows = transactions?.filter(
    (transaction) =>
      (selectedLabel === 'Replenished' && transaction.type == 'in') ||
      (selectedLabel === 'Dispensed' && transaction.type == 'out') ||
      selectedLabel === 'All',
  );

  useEffect(() => {
    setTotalSize(filteredRows.length);
    setNumOfPages(Math.ceil(filteredRows.length / pageSize));
  }, [filteredRows, pageSize]);

  const currentItems = filteredRows.slice(indexOfFirstItem, indexOfLastItem);

  const handleItemClick = (label) => {
    setSelectedLabel(label);
    setCurrentPage(1);
  };

  const logOnPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Set initial sort to date descending
  useEffect(() => {
    sortBy('datetime', SortDirection.DESCENDING);
  }, []);

  console.log(currentItems);

  return (
    <div>
      <div className={classes.filters}>
        <SearchField placeholder="Search for commodities or recipients" />
        <DropdownButton
          component={
            <FlyoutMenu>
              <MenuItem label="All" onClick={() => handleItemClick('All')} />
              <MenuItem
                label="Replenished"
                onClick={() => handleItemClick('Replenished')}
              />
              <MenuItem
                label="Dispensed"
                onClick={() => handleItemClick('Dispensed')}
              />
            </FlyoutMenu>
          }
          name={selectedLabel}
        >
          {selectedLabel}
        </DropdownButton>
      </div>
      <Table className={classes.table}>
        <TableHead>
          <TableRowHead>
            <SortableTableCellHead name="type" />
            <SortableTableCellHead
              name="datetime"
              displayName="Date and time"
            />
            <TableCellHead>Commodity</TableCellHead>
            <TableCellHead>Quantity</TableCellHead>
            <SortableTableCellHead name="recipient" />
          </TableRowHead>
        </TableHead>
        <TableBody>
          {currentItems.map((row, index) => (
            <TableRow key={`row-${index}`}>
              <TableCell className={classes.typeCell}>
                <div
                  className={`${classes.typeIndicator} ${
                    row.type === 'in' ? classes.replenished : classes.dispensed
                  }`}
                />
                {row.type === 'in' ? 'Replenished' : 'Dispensed'}
              </TableCell>
              <TableCell>{row.datetime.split(' ').join(', ')}</TableCell>
              <TableCell>
                {'commodities' in row ? (
                  <dd>
                    {row.commodities.map((commodity, commodityIndex) => (
                      <dt key={`row-${index}-name-${commodityIndex}`}>
                        {commodity.name}
                      </dt>
                    ))}
                  </dd>
                ) : (
                  row.commodity
                )}
              </TableCell>
              <TableCell>
                {'commodities' in row ? (
                  <dd>
                    {row.commodities.map((commodity, commodityIndex) => (
                      <dt key={`row-${index}-quantity-${commodityIndex}`}>
                        {commodity.quantity}
                      </dt>
                    ))}
                  </dd>
                ) : (
                  row.amount
                )}
              </TableCell>
              <TableCell>{capitalizeName(row.recipient)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.pagination}>
        <Pagination
          hidePageSizeSelect
          onPageChange={logOnPageChange}
          page={currentPage}
          pageCount={numOfPages}
          pageSize={pageSize}
          total={totalSize}
        />
      </div>
    </div>
  );
}
