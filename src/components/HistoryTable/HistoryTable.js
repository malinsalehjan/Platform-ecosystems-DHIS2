import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableRowHead,
  DataTableRow,
  DataTableCell,
  DropdownButton,
  FlyoutMenu,
  MenuItem,
  InputField,
  TableCellHead,
  Pagination
} from '@dhis2/ui';
import classes from './HistoryTable.module.css';
import SortableTableCellHead from '../CommodityTable/SortableTableCellHead/SortableTableCellHead';
import { useHistory } from '../../contexts/DHIS2HistoryContext';
import { SearchIcon, ExpandLess, ExpandMore } from '../../resources/icons/icons';

export default function HistoryTable() {
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedLabel, setSelectedLabel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const { data } = useHistory();
  
  const [totalSize, setTotalSize] = useState(data.TransactionData.transactions.length);
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const [numOfPages, setNumOfPages] = useState(Math.ceil(totalSize / pageSize));

  const filteredRows = data.TransactionData.transactions.filter((row) => {
    const labelCondition =
      (selectedLabel === 'Refilled' && row.type == 'in') ||
      (selectedLabel === 'Dispenced' && row.type == 'out') ||
      (selectedLabel === 'All');

    return (
      labelCondition &&
      row.commodity.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  useEffect(() => {
    setTotalSize(filteredRows.length);
    setNumOfPages(Math.ceil(filteredRows.length / pageSize));
  }, [filteredRows, pageSize]);

  const currentItems = filteredRows.slice(indexOfFirstItem, indexOfLastItem);

  const handleItemClick = (label) => {
    setSelectedLabel(label);
    setCurrentPage(1);

    console.log("label: ", label);
    console.log("numOfPages: ", numOfPages);
    console.log("length: ", filteredRows.length);
    console.log("pageSize: ", pageSize);
    console.log("currentItems: ", currentItems.length);

  };

  const toggleRowExpansion = (rowId) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [rowId]: !prevExpandedRows[rowId],
    }));
  };

  const logOnPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div >
      <div className={classes.alignContent}>
        <div className={classes.searchField}>
          <InputField
            type="text"
            placeholder="Search e.g. 'Oxytocin'"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.value)}
          />
          <SearchIcon />
        </div>
        <div className={classes.dropDown}>
          <DropdownButton
            component={
              <FlyoutMenu style={{ position: 'relative' }}>
                <MenuItem label="All" onClick={() => handleItemClick('All')} />
                <MenuItem label="Refilled" onClick={() => handleItemClick('Refilled')} />
                <MenuItem label="Dispenced" onClick={() => handleItemClick('Dispenced')} />
              </FlyoutMenu>
            }
            name={selectedLabel}
          >
            {selectedLabel}
          </DropdownButton>
        </div>
      </div>
      <Table style={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRowHead>
            <TableCellHead className={classes.columnSpacing} style={{ width: '10%'}}></TableCellHead>
            <SortableTableCellHead name="Type" className={classes.columnSpacing} style={{ width: '10%' }} />
            <SortableTableCellHead name="Commodity" className={classes.columnSpacing} style={{ width: '20%' }} />
            <SortableTableCellHead name="Amount" className={classes.columnSpacing} style={{ width: '10%' }}/>
            <SortableTableCellHead name="Date" className={classes.columnSpacing} style={{ width: '10%' }}/>
            <SortableTableCellHead name="Time" className={classes.columnSpacing} style={{ width: '10%' }} />
          </TableRowHead>
        </TableHead>
        {currentItems.map((row) => (
          <React.Fragment key={row.id}>
            <DataTableRow >
              <DataTableCell className={classes.columnSpacing} style={{ width: '4%', height: '4.5em' }}>
                <div
                  onClick={() => toggleRowExpansion(row.id)}
                  className={classes.expandButton}
                >
                  {row.type !== 'in' && (expandedRows[row.id] ? ExpandLess() : ExpandMore())}
                </div>
              </DataTableCell>
              <DataTableCell className={classes.columnSpacing} style={{ width: '10%' }}>
                {row.type === "in" ? "Refilled" : row.type === "out" ? "Dispensed" : ""}
              </DataTableCell>
              <DataTableCell className={classes.columnSpacing} style={{ width: '20%' }}>{row.commodity}</DataTableCell>
              <DataTableCell className={classes.columnSpacing} style={{ width: '10%' }}>
                {row.amount}
              </DataTableCell>
              <DataTableCell className={classes.columnSpacing} style={{ width: '10%' }}>{row.datetime.split(' ')[0]}</DataTableCell>
              <DataTableCell className={classes.columnSpacing} style={{ width: '10%' }}>{row.datetime.split(' ')[1]}</DataTableCell>
            </DataTableRow>
            {expandedRows[row.id] && (
              <DataTableRow >
                <DataTableCell colSpan={8} className={classes.columnSpacing} style={{ width: '10%' }}>
                  <div className={classes.expand}>
                    {row.type === 'out' && (
                    <div className={classes.expandedText}>
                      <p className={classes.expandedText}>
                        Dispensed By: {row.dispensedBy}
                      </p>
                      <p  className={classes.expandedText}>
                        Dispensed To: {row.recipient}
                      </p>
                    </div>
                  )}
                  </div>
                </DataTableCell>
              </DataTableRow>
            )}
          </React.Fragment>
        ))}
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
