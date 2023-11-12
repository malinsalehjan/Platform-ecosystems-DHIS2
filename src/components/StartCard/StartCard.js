import React from 'react';
import styles from './StartCard.module.css'; 
import Cross from '../../resources/icons/Cross';

const StartCard = ({ onStartModules,onClose }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <button className={styles.startButton}onClick={onStartModules}>START A QUICK TOUR</button>
        <button className={styles.exitButton} onClick={onClose}><Cross /></button>
      </div>
    </div>
  );
};

export default StartCard;