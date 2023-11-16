import React, { useContext } from 'react';
import { Switch } from '@dhis2/ui';
import classes from './TrainingModeSwitch.module.css';
import { TrainingModeContext } from '../../../../contexts/TrainingModeContext';

export const TrainingModeSwitch = () => {
  const { isTrainingMode, setIsTrainingMode } = useContext(TrainingModeContext);

  const handleTrainingToggle = () => {
    setIsTrainingMode(!isTrainingMode);
  };

  return (
    <div className={classes.trainingSwitch}>
      <span style={{ marginRight: '1.5vw' }}>Training mode</span>
      <Switch
        className={classes.customSwitch}
        checked={isTrainingMode}
        onChange={handleTrainingToggle}
      />
    </div>
  );
};
