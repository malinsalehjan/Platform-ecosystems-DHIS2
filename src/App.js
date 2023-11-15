import React, { useState } from 'react';
import classes from './App.module.css';
import InventoryPage from './pages/InventoryPage/InventoryPage';
import TrainingPage from './pages/TrainingPage/TrainingPage';
import RefillPage from './pages/RefillPage/RefillPage';
import { DHIS2Provider } from './contexts/DHIS2Context';
import Navigation from './components/Navigation/Navigation';
import { AlertProvider } from './contexts/AlertContext';
import { daysUntilDelivery } from './utility/dateUtility';
import { IconCalendar16 } from '@dhis2/ui';

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
          <div className={classes.details}>
            <span>
              <IconCalendar16 />
              {new Date().toLocaleDateString()}
            </span>
            <span>Days until next delivery: {daysUntilDelivery()}</span>
          </div>
          <DHIS2Provider>
            {activePage === 'Inventory' && {activePage === 'Inventory' && <InventoryPage />}
            {activePage === 'TrainingPage' && <TrainingPage />}}
            {activePage === 'Refill' && <RefillPage />}
          </DHIS2Provider>
        </div>
      </AlertProvider>
    </div>
  );
};

export default App;
