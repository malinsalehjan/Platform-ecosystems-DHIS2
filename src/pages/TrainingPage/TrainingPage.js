import React, { useState, useEffect } from 'react';
import { useDHIS2 } from '../../contexts/DHIS2Context';
import { CircularLoader } from '@dhis2/ui';
import classes from './TrainingPage.module.css';
import Slider from "../../components/Slider/Slider";
import Dropdown from '../../components/Dropdown/Dropdown';

export default function TrainingPage({ currentModule }) {
  const { loading, error } = useDHIS2();
  // ... other state initialization ...

  // State to control which dropdown is open
  const [openModule, setOpenModule] = useState(null);

  useEffect(() => {
    // When the component mounts, open the module specified by currentModule
    setOpenModule(currentModule);
  }, [currentModule]);

  // Helper function to toggle the dropdown
  const toggleDropdown = (moduleNumber) => {
    setOpenModule(openModule === moduleNumber ? null : moduleNumber);
  };
  return loading ? (
    <CircularLoader />
  ) : error ? (
    <span>An error has occurred ...</span>
  ) : (
  <div className={classes.container}>
        <h2>Training mode</h2>
        <h3>Modules</h3>
        <div className={classes.dropdown1}>
          <Dropdown title="01 Dispensing a commodity" onLastSlide={onLastSlide1}>
            <div className={classes.screenContainer}>
              <div className={classes.screen}>
                <Slider onLastSlide={setOnLastSlide1} />
                {onLastSlide1}
              </div>
            </div>
          </Dropdown>
        </div>
        
        <div className={classes.dropdown2}>
          <Dropdown title="02 Refill a commodity" onLastSlide={onLastSlide2}>
            <div className={classes.screenContainer}>
              <div className={classes.screen}>
                <Slider onLastSlide={setOnLastSlide2} />
                {onLastSlide2}
              </div>
            </div>
          </Dropdown>
        </div>
        
        <div className={classes.dropdown3}>
          <Dropdown title="03 Search in History" onLastSlide={onLastSlide3}>
            <div className={classes.screenContainer}>
              <div className={classes.screen}>
                <Slider onLastSlide={setOnLastSlide3} />
                {onLastSlide3}
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
  );
}