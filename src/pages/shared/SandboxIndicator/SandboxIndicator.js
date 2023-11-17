import React from 'react';
import classes from './SandboxIndicator.module.css';
import { Button, IconCross24 as CrossIcon } from '@dhis2/ui';
import { useDHIS2 } from '../../../contexts/DHIS2Context';

export default function SandboxIndicator() {
  const { sandboxEnabled, setSandboxEnabled } = useDHIS2();

  return (
    sandboxEnabled && (
      <div>
        {<div className={classes.border} />}
        <div
          className={`${classes.actions} ${sandboxEnabled && classes.enabled}`}
        >
          <span>{'Training mode enabled. Actions will not be saved'}</span>
          <Button
            icon={<CrossIcon />}
            onClick={() => setSandboxEnabled(false)}
          />
        </div>
      </div>
    )
  );
}
