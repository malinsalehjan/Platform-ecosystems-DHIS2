import React from 'react';
import classes from './TrainingModeIndicator.module.css';
import { Button, IconCross24 as CrossIcon } from '@dhis2/ui';
import { useDHIS2 } from '../../../contexts/DHIS2Context';

export default function TrainingModeIndicator() {
  const { trainingModeEnabled, setTrainingModeEnabled } = useDHIS2();

  return (
    trainingModeEnabled && (
      <div>
        {<div className={classes.border} />}
        <div
          className={`${classes.actions} ${
            trainingModeEnabled && classes.enabled
          }`}
        >
          <span>{'Training mode enabled. Actions will not be saved'}</span>
          <Button
            icon={<CrossIcon />}
            onClick={() => setTrainingModeEnabled(false)}
          />
        </div>
      </div>
    )
  );
}
