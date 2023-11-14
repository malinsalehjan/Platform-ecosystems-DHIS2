import React, { useState, useEffect } from 'react';
import { CircularLoader } from '@dhis2/ui';
import classes from './TrainingPage.module.css';
import Slider from "../../components/Slider/Slider";
import Dropdown from '../../components/Dropdown/Dropdown';
import sliderData from '../../components/Slider/SliderData/SliderData';
import LastCard from '../../components/PopupCard/LastCard';
import { useDHIS2 } from '../../contexts/DHIS2Context';

export default function TrainingPage() {
  const { loading, error } = useDHIS2();
  const [onLastSlide1, setOnLastSlide1] = useState(false);
  const [onLastSlide2, setOnLastSlide2] = useState(false);
  const [onLastSlide3, setOnLastSlide3] = useState(false);
  const [lastCardDisplayed, setLastCardDisplayed] = useState(false);

  // Check localStorage to see if the modules were completed earlier
  useEffect(() => {
    const module1Completed = localStorage.getItem('moduleCompleted_module1') === 'true';
    const module2Completed = localStorage.getItem('moduleCompleted_module2') === 'true';
    const module3Completed = localStorage.getItem('moduleCompleted_module3') === 'true';

    setOnLastSlide1(module1Completed);
    setOnLastSlide2(module2Completed);
    setOnLastSlide3(module3Completed);
  }, []);

  const allModulesOnLastSlide = onLastSlide1 && onLastSlide2 && onLastSlide3;

  const handleTryTestingMode = () => {
    // Implementation for navigating to testing mode
  };

  const handleCloseLastCard = () => {
    setLastCardDisplayed(true);
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
        <Dropdown moduleId="module1" title="01 Dispensing a commodity" onLastSlide={onLastSlide1}>
          <div className={classes.screenContainer}>
            <div className={classes.screen}>
              <Slider onLastSlide={setOnLastSlide1} sliderData={sliderData.dropdown1} />
              {onLastSlide1}
            </div>
          </div>
        </Dropdown>
      </div>

      <div className={classes.dropdown2}>
        <Dropdown moduleId="module2" title="02 Refill a commodity" onLastSlide={onLastSlide2}>
          <div className={classes.screenContainer}>
            <div className={classes.screen}>
              <Slider onLastSlide={setOnLastSlide2} sliderData={sliderData.dropdown2} />
              {onLastSlide2}
            </div>
          </div>
        </Dropdown>
      </div>

      <div className={classes.dropdown3}>
        <Dropdown moduleId="module3" title="03 Search in History" onLastSlide={onLastSlide3}>
          <div className={classes.screenContainer}>
            <div className={classes.screen}>
              <Slider onLastSlide={setOnLastSlide3} sliderData={sliderData.dropdown3} />
              {onLastSlide3}
            </div>
          </div>
        </Dropdown>
      </div>

      {allModulesOnLastSlide && !lastCardDisplayed && (
        <LastCard tryTestingMode={handleTryTestingMode} onClose={handleCloseLastCard} />
      )}
    </div>
  );
}