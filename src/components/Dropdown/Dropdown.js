import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.module.css';
import ChevronDown from '../../resources/icons/ChevronDown';

const Dropdown = ({ title, children, moduleId, onLastSlide }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Save which modules are completed even if you change site 
  const localStorageKey = `moduleCompleted_${moduleId}`;

  useEffect(() => {
    
    if (onLastSlide) {
      localStorage.setItem(localStorageKey, 'true');
    }
    
  }, [onLastSlide, localStorageKey]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dropdownClasses = classNames(styles.dropdown, {
    [styles.completed]: localStorage.getItem(localStorageKey) === 'true',
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