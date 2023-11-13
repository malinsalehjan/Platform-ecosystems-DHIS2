import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.module.css';
import { ChevronDown } from '../../resources/icons/icons';

const Dropdown = ({ title, children, moduleId }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  
  const localStorageKey = `dropdownCompleted_${moduleId}`;

  useEffect(() => {

    const completedStatus = localStorage.getItem(localStorageKey);
    setIsCompleted(completedStatus === 'true');
  }, [localStorageKey]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);

    if (!isCompleted && isDropdownOpen) {
      setIsCompleted(true);
      localStorage.setItem(localStorageKey, 'true');
    }
  };

  const dropdownClasses = classNames(styles.dropdown, {
    [styles.completed]: isCompleted, 
  });

  return (
    <div className={dropdownClasses}>
      <div className={styles.dropdownHeader} onClick={handleDropdownToggle}>
        {title}
        <ChevronDown className={styles.chevronIcon} />
      </div>
      {isDropdownOpen && (
        <div className={styles.dropdownContent}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;