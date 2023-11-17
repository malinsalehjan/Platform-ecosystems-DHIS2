import React, { useState } from 'react';
import { CircularLoader, Switch } from '@dhis2/ui';
import classes from './TrainingPage.module.css';
import Slider from './components/Slider/Slider';
import Dropdown from './components/Dropdown/Dropdown';
import TryTrainingModeModal from './components/TryTrainingModeModal/TryTrainingModeModal';
import { useDHIS2 } from '../../contexts/DHIS2Context';
import CircularProgressBar from './components/ProgressBar/CircularProgressBar/CircularProgressBar';
import TrainingModeConfirmationModal from './components/TrainingModeConfirmationModal/TrainingModeConfirmationModal';

export default function TrainingPage() {
  const [shouldConfirmSwitch, setShouldConfirmSwitch] = useState(false);

  const {
    loading,
    error,
    trainingModeEnabled,
    setTrainingModeEnabled,
    trainingModules,
    displayTrainingModeSuggestion,
    doNotSuggestTrainingModeAgain,
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

  const totalProgress =
    (trainingModules.reduce(
      (total, module) => (module.isComplete ? total + 1 : total),
      0,
    ) /
      trainingModules.length) *
    100;

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
            Welcome to The Training page! This special mode is designed for you
            to freely explore and familiarize yourself with our application.{' '}
            <br></br>
            <br></br>
            <strong>Test and Experiment: </strong>
            Try out features without any permanent changes.
            <br></br>
            <strong> Learn at Your Pace: </strong>
            Discover the functionalities with helpful tips through the modules
            <br></br>
            <strong> No Risks: </strong>
            All actions done when the Training mode switch is on won't affect
            the data
            <br></br>
            <br></br>
            Enjoy exploring and practicing in a worry-free environment!
            <br></br>
            <strong>
              You should complete the Modules before exploring in The Training
              Mode.
            </strong>
          </p>
          <Switch
            label="Training Mode"
            checked={trainingModeEnabled}
            onChange={handleChangeSwitch}
          />
        </div>
        <div className={classes.circularProgress}>
          <CircularProgressBar progress={totalProgress} />
        </div>
      </div>
      <h3>Modules</h3>
      {trainingModules.map((module) => {
        return (
          <div key={module.id}>
            <Dropdown
              completed={module.isComplete}
              title={module.content.title}
            >
              <div className={classes.screenContainer}>
                <div className={classes.screen}>
                  <Slider module={module} />
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

      {displayTrainingModeSuggestion && (
        <TryTrainingModeModal
          onClose={() => {
            doNotSuggestTrainingModeAgain();
          }}
          onConfirm={() => {
            handleConfirmModeSwitch();
            doNotSuggestTrainingModeAgain();
          }}
        />
      )}
    </div>
  );
}
