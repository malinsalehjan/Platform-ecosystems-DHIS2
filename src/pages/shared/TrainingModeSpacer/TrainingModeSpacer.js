import React from 'react';
import classes from './TrainingModeSpacer.module.css';
import { useDHIS2 } from '../../../contexts/DHIS2Context';

export default function TrainingModeSpacer() {
  const { trainingModeEnabled } = useDHIS2();

  return trainingModeEnabled && <div className={classes.spacer}></div>;
}
