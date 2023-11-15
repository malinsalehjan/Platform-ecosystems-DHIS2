import React, { useState } from 'react';
import classes from './App.module.css';
import InventoryPage from './pages/InventoryPage/InventoryPage';
<<<<<<< HEAD
import TrainingPage from './pages/TrainingPage/TrainingPage';
=======
import HistoryPage from './pages/HistoryPage/HistoryPage';
>>>>>>> f02ae22 (Feat/history log (#7))
import RefillPage from './pages/RefillPage/RefillPage';
import { DHIS2Provider } from './contexts/DHIS2Context';
import { DHIS2HistoryProvider } from './contexts/DHIS2HistoryContext';
import Navigation from './components/Navigation/Navigation';
import { AlertProvider } from './contexts/AlertContext';
import { daysUntilDelivery } from './utility/dateUtility';
import { IconCalendar16 } from '@dhis2/ui';

const App = () => {
<<<<<<< HEAD
  const [activePage, setActivePage] = useState('Inventory'); 
=======
  const [activePage, setActivePage] = useState('Inventory');
  console.log(activePage);
>>>>>>> f02ae22 (Feat/history log (#7))

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
<<<<<<< HEAD
            {activePage === 'Inventory' && {activePage === 'Inventory' && <InventoryPage />}
            {activePage === 'TrainingPage' && <TrainingPage />}}
            {activePage === 'Refill' && <RefillPage />}
=======
            <DHIS2HistoryProvider>
              {activePage === 'Inventory' && <InventoryPage />}
              {activePage === 'Refill' && <RefillPage />}
              {activePage === 'History' && <HistoryPage />}
            </DHIS2HistoryProvider>
>>>>>>> f02ae22 (Feat/history log (#7))
          </DHIS2Provider>
        </div>
      </AlertProvider>
    </div>
  );
};

export default App;
