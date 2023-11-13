import React, { useState } from 'react';
import StartCard from './components/StartCard';
import TrainingPage from './TrainingPage';

const ParentCard = () => {
  const [isTrainingMode, setIsTrainingMode] = useState(false);
  const [showStartCard, setShowStartCard] = useState(true);

  const startTraining = () => {
    setIsTrainingMode(true);
    setShowStartCard(false);
  };

  const closeStartCard = () => {
    setShowStartCard(false);
  };

  return (
    <div>
      {showStartCard && !isTrainingMode && (
        <StartCard onStartTour={startTraining} onClose={closeStartCard} />
      )}
    </div>
  );
};
