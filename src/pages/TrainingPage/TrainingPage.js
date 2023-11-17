import React, { useState } from 'react';
import { CircularLoader, Switch } from '@dhis2/ui';
import classes from './TrainingPage.module.css';
import Slider from './components/Slider/Slider';
import Dropdown from './components/Dropdown/Dropdown';
import LastCard from './components/PopupCard/LastCard';
import { useDHIS2 } from '../../contexts/DHIS2Context';
import CircularProgressBar from './components/ProgressBar/CircularProgressBar/CircularProgressBar';
import TrainingModeConfirmationModal from './components/TrainingModeConfirmationModal/TrainingModeConfirmationModal';
import trainingModules from '../../resources/trainingModules/trainingModules.json';

export default function TrainingPage() {
  const [shouldConfirmSwitch, setShouldConfirmSwitch] = useState(false);

  const { loading, error, trainingModeEnabled, setTrainingModeEnabled } =
    useDHIS2();

  const initialOnLastSlide = [];
  for (let i = 0; i < trainingModules.length; i++) {
    const isCompleted =
      sessionStorage.getItem(`moduleCompleted_module${i + 1}`) === 'true';
    initialOnLastSlide.push(isCompleted);
  }

  const [onLastSlide, setOnLastSlide] = useState(initialOnLastSlide);
  const [lastCardDisplayed, setLastCardDisplayed] = useState(false);

  const totalModules = trainingModules.length;
  const completedModules = onLastSlide.filter((status) => status).length;
  const overallProgress = (completedModules / totalModules) * 100;

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
    // enable training mode her virka det som
    setLastCardDisplayed(true);
  };

  const handleCloseLastCard = () => {
    setLastCardDisplayed(true);
  };

  function handleSwitchChange() {
    if (!trainingModeEnabled) {
      setShouldConfirmSwitch(true);
    } else {
      setTrainingModeEnabled(false);
    }
  }

  function handleConfirmModeSwitch() {
    setShouldConfirmSwitch(false);
    setTrainingModeEnabled(true);
  }

  return loading ? (
    <CircularLoader />
  ) : error ? (
    <span>An error has occurred ...</span>
  ) : (
    <div className={classes.container}>
      <div className={classes.intro}>
        <div>
          <h2>Training</h2>
          <p>
            You can use this application to test the flow of the application and
            get more tips and guidance on how to use it. <br></br>
            Changes made in training mode won't be saved permanently, so feel
            free to explore without worry!
          </p>
          <Switch
            label="Training mode"
            checked={trainingModeEnabled}
            onChange={handleSwitchChange}
          />
        </div>
        <CircularProgressBar progress={overallProgress} />
      </div>
      <h3>Modules</h3>
      {trainingModules.map((module, index) => (
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

      {shouldConfirmSwitch && (
        <TrainingModeConfirmationModal
          onClose={() => setShouldConfirmSwitch(false)}
          onConfirm={handleConfirmModeSwitch}
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
