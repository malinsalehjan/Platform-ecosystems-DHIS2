import React from 'react';
import { Button } from '@dhis2/ui';
import styles from './PopupCard.module.css'; 
import CrossIcon from '../../resources/icons/Cross'; 

const StartCard = ({ onStartTour, onClose }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <Button className={styles.startButton} onClick={onClose}>START A QUICK TOUR</Button>
        <Button className={styles.exitButton} onClick={onClose}>
          <CrossIcon />
        </Button>   
      </div>
    </div>
  );
};

export default StartCard;