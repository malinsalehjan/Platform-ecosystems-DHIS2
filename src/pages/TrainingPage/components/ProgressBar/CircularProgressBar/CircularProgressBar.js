import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from './CircularProgressBar.module.css';

const CircularProgressBar = ({ progress }) => {
  const roundedProgress = Math.round(progress);

  const textColor = progress === 100 ? '#449F48' : '#0d47a1';
  const pathColor = progress === 100 ? '#449F48' : '#0d47a1';

  const progressValue = 100;


  return (
    <div className={styles['circular-progress-container']}>
      <CircularProgressbar
        value={roundedProgress}
        text={`${roundedProgress}%`}
        styles={buildStyles({
          textColor,
          pathColor,
        })}
      />
    </div>
  );
};

export default CircularProgressBar;
