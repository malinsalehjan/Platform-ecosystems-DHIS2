import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.module.css';

const Dropdown = ({ title, children, onLastSlide }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dropdownClasses = classNames(styles.dropdown, { [styles.lastSlide]: onLastSlide && isDropdownOpen });

  return (
    <div className={dropdownClasses}>
      <div className={styles.dropdownHeader} onClick={handleDropdownToggle}>
        {title}
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
