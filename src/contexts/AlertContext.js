import React, { createContext, useContext, useState } from 'react';
import { AlertStack, AlertBar } from '@dhis2/ui';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (message, type, options = {}) => {
    const alertOptions = {
      ...options,
      [type]: true,
    };

    setAlerts((prevAlerts) => [
      ...prevAlerts,
      { id: Date.now(), message, options: alertOptions },
    ]);
  };

  const removeAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
      <AlertStack>
        {alerts.map((alert) => (
          <AlertBar
            key={alert.id}
            {...alert.options}
            onHidden={() => removeAlert(alert.id)}
          >
            {alert.message}
          </AlertBar>
        ))}
      </AlertStack>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
