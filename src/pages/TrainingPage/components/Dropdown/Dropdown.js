import React, { useState } from 'react';
import classNames from 'classnames';
import classes from './Dropdown.module.css';
import {
  IconChevronDown24 as ChevronDown,
  IconChevronUp24 as ChevronUp,
} from '@dhis2/ui';

const Dropdown = ({ title, completed, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${classes.dropdown} ${completed && classes.completed}`}>
      <div
        className={classes.dropdownHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      {isOpen && <div className={classes.dropdownContent}>{children}</div>}
    </div>
  );
};

export default Dropdown;
