import React, { useState } from 'react';
import { Button } from '@dhis2/ui';
import styles from './PopupCard.module.css'; 

const TrainingCard = ({ confirmTesting, onClose }) => {
  const [isCardDisplayed, setIsCardDisplayed] = useState(true);

  const handleConfirmTesting = () => {
    confirmTesting();
    setIsCardDisplayed(false);
  };

  const handleCloseCard = () => {
    onClose();
    setIsCardDisplayed(false);
  };

  return isCardDisplayed && (
    <div>
      <div className={styles.backdrop}></div>

      <div className={styles.card}>
        <div className={styles.trainingContent}>

          <div className={styles.trainingTitle}>
            Confirm mode switch
          </div>

          <div className={styles.trainingText}>
            You are switching to Testing mode.<br></br>
            This will allow you to test how the system works.<br></br><br></br>
            The pages will have teal colored frames in Testing mode.
          </div>

          <Button className={styles.confirmButton} onClick={handleConfirmTesting}>
            Confirm
          </Button>

          <Button className={styles.cancelButton} onClick={handleCloseCard}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrainingCard;