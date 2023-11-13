import React, { useState, useEffect } from 'react';
import { useDHIS2 } from '../../contexts/DHIS2Context';
import { CircularLoader } from '@dhis2/ui';
import classes from './TrainingPage.module.css';
import Slider from "../../components/Slider/Slider";
import Dropdown from '../../components/Dropdown/Dropdown';
import sliderData from '../../components/Slider/SliderData/SliderData';
import LastCard from '../../components/PopupCard/LastCard';

export default function TrainingPage({ currentModule }) {
  const { loading, error } = useDHIS2();
  const [onLastSlide1, setOnLastSlide1] = useState(false);
  const [onLastSlide2, setOnLastSlide2] = useState(false);
  const [onLastSlide3, setOnLastSlide3] = useState(false);
  const [lastCardDisplayed, setLastCardDisplayed] = useState(false);

  const [openModule, setOpenModule] = useState(null);

  useEffect(() => {
    setOpenModule(currentModule);
  }, [currentModule]);

  const allModulesOnLastSlide = onLastSlide1 && onLastSlide2 && onLastSlide3;

  // Send the user to the testing mode tool
  const handleTryTestingMode = () => {
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
        <Dropdown title="01 Dispensing a commodity" onLastSlide={onLastSlide1}>
          <div className={classes.screenContainer}>
            <div className={classes.screen}>
              <Slider onLastSlide={setOnLastSlide1} sliderData={sliderData.dropdown1} />
              {onLastSlide1}
            </div>
          </div>
        </Dropdown>
      </div>

      <div className={classes.dropdown2}>
        <Dropdown title="02 Refill a commodity" onLastSlide={onLastSlide2}>
          <div className={classes.screenContainer}>
            <div className={classes.screen}>
              <Slider onLastSlide={setOnLastSlide2} sliderData={sliderData.dropdown2} />
              {onLastSlide2}
            </div>
          </div>
        </Dropdown>
      </div>

      <div className={classes.dropdown3}>
        <Dropdown title="03 Search in History" onLastSlide={onLastSlide3}>
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

