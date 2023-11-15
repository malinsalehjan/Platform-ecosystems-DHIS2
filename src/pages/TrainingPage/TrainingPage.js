import React, { useState, useEffect } from 'react';
import { CircularLoader } from '@dhis2/ui';
import classes from './TrainingPage.module.css';
import Slider from "../../components/Slider/Slider";
import Dropdown from '../../components/Dropdown/Dropdown';
import LastCard from '../../components/PopupCard/LastCard';
import CircularProgressBar from '../../components/Slider/CircularProgressBar/CircularProgressBar';
import { useDHIS2 } from '../../contexts/DHIS2Context';
import Module from './Module.json'; 

export default function TrainingPage() {
  const { loading, error } = useDHIS2();

  const initialOnLastSlide = [];
  for (let i = 0; i < Module.length; i++) {
      const isCompleted = sessionStorage.getItem(`moduleCompleted_module${i + 1}`) === 'true';
      initialOnLastSlide.push(isCompleted);
  }

  const [onLastSlide, setOnLastSlide] = useState(initialOnLastSlide);
  const [lastCardDisplayed, setLastCardDisplayed] = useState(false);

  const totalModules = Module.length;
  const completedModules = onLastSlide.filter((status) => status).length;
  const overallProgress = (completedModules / totalModules) * 100;


  //Updating state of completion
  const handleSetOnLastSlide = (index) => {
    if (!onLastSlide[index]) {
      const updatedOnLastSlide = [...onLastSlide];

      updatedOnLastSlide[index] = true;
      setOnLastSlide(updatedOnLastSlide);
    }
};

  //Use .every to check if all elements are True
  const allModulesOnLastSlide = onLastSlide.every(status => status);

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
      <p>Welcome to The Training Mode!
      Users can use this application to test the flow of the application and get more tips and guidance on how to use it. <br></br>
      Any changes made in the training mode is not stored permanently. 
      </p>
      <h3>Modules</h3>
      {Module.map((module, index) => (
          <div key={module.moduleId} className={classes[`dropdown${index + 1}`]}>
            <Dropdown moduleId={module.moduleId} title={module.title} onLastSlide={onLastSlide[index]}>
              <div className={classes.screenContainer}>
                <div className={classes.screen}>
                  <Slider onLastSlide={(value) => handleSetOnLastSlide(index, value)} sliderData={module.sliderData} />
                  {onLastSlide[index]}
                </div>
              </div>
            </Dropdown>
          </div>
        ))}

      <CircularProgressBar progress={overallProgress} />

      {allModulesOnLastSlide && !lastCardDisplayed && (
        <LastCard tryTestingMode={handleTryTestingMode} onClose={handleCloseLastCard} />
      )}
    </div>
  );
}
