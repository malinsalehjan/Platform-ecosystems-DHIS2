import React from 'react';
import { Button } from '@dhis2/ui';
import styles from './PopupCard.module.css'; 
import CrossIcon from '../../resources/icons/Cross';

const LastCard = ({ tryTestingMode, onClose }) => {
    return (
      <div>
        <div className={styles.backdrop}></div>
  
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <Button className={styles.startButton} onClick={tryTestingMode}>
              Try it out in the testing mode now!
            </Button>

            <div className={styles.completedText}>3/3 sections completed</div>
            
            <Button className={styles.exitButton} onClick={onClose}>
              <CrossIcon />
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  export default LastCard;