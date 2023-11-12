import React, { useState } from 'react';
import StartCard from './components/StartCard';
import TrainingPage from './TrainingPage'; 

const ParentComponent = () => {
  const [isTrainingMode, setIsTrainingMode] = useState(false);

  const startTrainingMode = () => {
    setIsTrainingMode(true);
  };

  return (
    <div>
      {!isTrainingMode ? <StartCard onStartModules={startTrainingMode} /> : <TrainingPage />}
    </div>
  );
};

export default ParentComponent;