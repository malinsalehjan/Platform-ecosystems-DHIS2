import React, { createContext, useContext, useState } from 'react';

export const TrainingModeContext = createContext();

export const TrainingModeProvider = ({ children }) => {
  const [isTrainingMode, setIsTrainingMode] = useState(false);

  return (
    <TrainingModeContext.Provider value={{ isTrainingMode, setIsTrainingMode }}>
      {children}
    </TrainingModeContext.Provider>
  );
};

export const useTrainingMode = () => {
  const context = useContext(TrainingModeContext);
  if (context === undefined) {
    throw new Error(
      'useTrainingMode must be used within a TrainingModeProvider',
    );
  }
  return context;
};
