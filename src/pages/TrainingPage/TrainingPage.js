import React, { useState } from 'react';
import { CircularLoader, Switch } from '@dhis2/ui';
import classes from './TrainingPage.module.css';
import Slider from './components/Slider/Slider';
import Dropdown from './components/Dropdown/Dropdown';
import TryTrainingModeModal from './components/TryTrainingModeModal/TryTrainingModeModal';
import { useDHIS2 } from '../../contexts/DHIS2Context';
import CircularProgressBar from './components/ProgressBar/CircularProgressBar/CircularProgressBar';
import TrainingModeConfirmationModal from './components/TrainingModeConfirmationModal/TrainingModeConfirmationModal';
import trainingModules from '../../resources/trainingModules/trainingModules.json';

export default function TrainingPage() {
  const [shouldConfirmSwitch, setShouldConfirmSwitch] = useState(false);
  const [justFinishedTrainingModules, setJustFinishedTrainingModules] =
    useState(false);

  const {
    loading,
    error,
    trainingModeEnabled,
    setTrainingModeEnabled,
    trainingModuleProgress,
    setTrainingModuleProgress,
  } = useDHIS2();

  function handleChangeSwitch() {
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
            You can use this page to test the flow of the application and get
            more tips and guidance on how to use it. <br></br>
            Changes made in training mode won't be saved permanently, so feel
            free to explore without worry!
          </p>
          <Switch
            label="Training mode"
            checked={trainingModeEnabled}
            onChange={handleChangeSwitch}
          />
        </div>
        <CircularProgressBar progress={0} />
      </div>
      <h3>Modules</h3>
      {trainingModules.map((module) => {
        const completed = trainingModuleProgress.find(
          (otherModule) => module.id === otherModule.id,
        );

        console.log(module, completed);

        return (
          <div key={module.id}>
            <Dropdown completed={completed} title={module.title}>
              <div className={classes.screenContainer}>
                <div className={classes.screen}>
                  <Slider onLastSlide={() => {}} images={module.images} />
                </div>
              </div>
            </Dropdown>
          </div>
        );
      })}

      {shouldConfirmSwitch && (
        <TrainingModeConfirmationModal
          onClose={() => setShouldConfirmSwitch(false)}
          onConfirm={handleConfirmModeSwitch}
        />
      )}

      {justFinishedTrainingModules && (
        <TryTrainingModeModal
          onClose={() => setJustFinishedTrainingModules(false)}
          onConfirm={handleConfirmModeSwitch}
        />
      )}
    </div>
  );
}
