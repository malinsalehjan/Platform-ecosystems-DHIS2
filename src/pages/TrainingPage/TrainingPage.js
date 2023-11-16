import React, { useState } from 'react';
import { CircularLoader } from '@dhis2/ui';
import classes from './TrainingPage.module.css';
import Slider from './components/Slider/Slider';
import { TrainingModeSwitch } from './components/Switch/TrainingModeSwitch';
import Dropdown from './components/Dropdown/Dropdown';
import LastCard from './components/PopupCard/LastCard';
import { useDHIS2 } from '../../contexts/DHIS2Context';
import { useTrainingMode } from '../../contexts/TrainingModeContext';
import CircularProgressBar from './components/ProgressBar/CircularProgressBar/CircularProgressBar';
import TrainingCard from './components/PopupCard/TrainingCard';
import Module from './Module.json';

export default function TrainingPage() {
  const { loading, error } = useDHIS2();

  const initialOnLastSlide = [];
  for (let i = 0; i < Module.length; i++) {
    const isCompleted =
      sessionStorage.getItem(`moduleCompleted_module${i + 1}`) === 'true';
    initialOnLastSlide.push(isCompleted);
  }

  const [onLastSlide, setOnLastSlide] = useState(initialOnLastSlide);
  const [lastCardDisplayed, setLastCardDisplayed] = useState(false);
  const [TrainingCardDisplayed, setTrainingCardDisplayed] = useState(false);
  const { isTrainingMode, setIsTrainingMode } = useTrainingMode();

  const totalModules = Module.length;
  const completedModules = onLastSlide.filter((status) => status).length;
  const overallProgress = (completedModules / totalModules) * 100;

  const borderStyle = isTrainingMode ? { border: '8px solid #00695c' } : {};

  const handleSetOnLastSlide = (index) => {
    if (!onLastSlide[index]) {
      const updatedOnLastSlide = [...onLastSlide];

      updatedOnLastSlide[index] = true;
      setOnLastSlide(updatedOnLastSlide);
    }
  };

  //Use .every to check if all elements are True
  const allModulesOnLastSlide = onLastSlide.every((status) => status);

  const handleTryTestingMode = () => {
    setIsTrainingMode(true);
    setLastCardDisplayed(true);
  };

  const handleCloseLastCard = () => {
    setLastCardDisplayed(true);
  };

  const handleCloseTrainingCard = () => {
    setTrainingCardDisplayed(true);
    setIsTrainingMode(false);
  };

  return loading ? (
    <CircularLoader />
  ) : error ? (
    <span>An error has occurred ...</span>
  ) : (
    <div className={classes.container} style={borderStyle}>
      <TrainingModeSwitch />
      <h2>Welcome to The Training Mode! </h2>
      <div className={classes.intro}>
        <p>
          Users can use this application to test the flow of the application and
          get more tips and guidance on how to use it. <br></br>
          Changes made in training mode won't be saved permanently, so feel free
          to explore without worry!
        </p>

        <CircularProgressBar progress={overallProgress} />
      </div>
      <h3>Modules</h3>
      {Module.map((module, index) => (
        <div key={module.moduleId} className={classes[`dropdown${index + 1}`]}>
          <Dropdown
            moduleId={module.moduleId}
            title={module.title}
            onLastSlide={onLastSlide[index]}
          >
            <div className={classes.screenContainer}>
              <div className={classes.screen}>
                <Slider
                  onLastSlide={(value) => handleSetOnLastSlide(index, value)}
                  imageData={module.imageData}
                />
                {onLastSlide[index]}
              </div>
            </div>
          </Dropdown>
        </div>
      ))}

      {isTrainingMode && (
        <TrainingCard
          confirmTesting={handleTryTestingMode}
          onClose={handleCloseTrainingCard}
        />
      )}

      {allModulesOnLastSlide && !lastCardDisplayed && (
        <LastCard
          tryTestingMode={handleTryTestingMode}
          onClose={handleCloseLastCard}
        />
      )}
    </div>
  );
}
