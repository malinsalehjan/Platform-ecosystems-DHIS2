import React from 'react';
import classes from './ProgressBar.module.css';

const ProgressBar = ({ current, total }) => {
  const progress = ((current + 1) / total) * 100;
  const progressText = current + 1 + '/' + total;
  const percentageText = Math.floor(progress) + '%';

  return (
    <div className={classes['bar-wrapper']}>
      <div className={classes['progress-text']}>{progressText}</div>
      <div className={classes.bar}>
        <div
          className={classes['progress-bar']}
          style={{ width: progress + '%' }}
        ></div>
      </div>
      <div className={classes['progress-text']}>{percentageText}</div>
    </div>
  );
};

export default ProgressBar;
