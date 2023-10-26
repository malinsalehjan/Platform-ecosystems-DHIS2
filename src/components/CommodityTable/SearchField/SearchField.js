import React, { useState, useEffect } from 'react';
import { InputField } from '@dhis2/ui';
import { useDHIS2 } from '../../../contexts/DHIS2Context';
import classes from './SearchField.module.css';
import { SearchIcon } from '../../../resources/icons/icons';

export default function SearchField() {
  const [searchText, setSearchText] = useState('');

  const { searchForCommodity } = useDHIS2();

  // Search any time the user changes the search text
  useEffect(() => {
    searchForCommodity(searchText);
  }, [searchText, searchForCommodity]);

  return (
    <div className={classes.searchField}>
      <InputField
        placeholder="Search for commodities"
        value={searchText}
        onChange={(event) => setSearchText(event.value)}
      />
      <SearchIcon />
    </div>
  );
}