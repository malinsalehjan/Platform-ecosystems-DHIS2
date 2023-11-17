import React from 'react';
import classes from './SandboxIndicator.module.css';
import { Switch } from '@dhis2-ui/switch';

export default function SandboxIndicator() {
  return (
    <div className={classes.indicator}>
      <div>
        <span>Training mode is enabled</span>
        <Switch label="disable?" />
      </div>
    </div>
  );
}
