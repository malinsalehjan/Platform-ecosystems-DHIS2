import React, { useState } from 'react';
import classes from './App.module.css';
import InventoryPage from './pages/InventoryPage/InventoryPage';
import TrainingPage from './pages/TrainingPage/TrainingPage';
import { DHIS2Provider } from './contexts/DHIS2Context';
import Navigation from './components/Navigation/Navigation';
import { AlertProvider } from './contexts/AlertContext';

const App = () => {
  const [activePage, setActivePage] = useState('Inventory'); 

  function activePageHandler(page) {
    setActivePage(page);
  }

  return (
    <div className={classes.container}>
      <AlertProvider>
        <div className={classes.left}>
          <Navigation
            activePage={activePage}
            activePageHandler={activePageHandler}
          />
        </div>
        <div className={classes.right}>
          <DHIS2Provider>
            {activePage === 'Inventory' && <InventoryPage />}
            {activePage === 'TrainingPage' && <TrainingPage />}
          </DHIS2Provider>
        </div>
      </AlertProvider>
    </div>
  );
};

export default App;
