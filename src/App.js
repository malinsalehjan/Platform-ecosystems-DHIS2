import React, { useState } from 'react';
import classes from './App.module.css';
import InventoryPage from './pages/InventoryPage/InventoryPage';
import TrainingPage from './pages/TrainingPage/TrainingPage';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import RefillPage from './pages/RefillPage/RefillPage';
import { DHIS2Provider } from './contexts/DHIS2Context';
import { TrainingModeProvider } from './contexts/TrainingModeContext';
import Navigation from './pages/shared/Navigation/Navigation';
import { AlertProvider } from './contexts/AlertContext';
import { daysUntilDelivery } from './utility/dateUtility';
import { IconCalendar16 as CalendarIcon } from '@dhis2/ui';

const App = () => {
  const [activePage, setActivePage] = useState('Inventory');
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className={classes.container}>
      <AlertProvider>
        <TrainingModeProvider>
          <div className={classes.left}>
            <Navigation activePage={activePage} setActivePage={setActivePage} />
          </div>
          <div className={classes.right}>
            <div className={classes.center}>
              <div className={classes.details}>
                <span>
                  <CalendarIcon />
                  <span>{currentDate}</span>
                </span>
                <span>Days until next delivery: {daysUntilDelivery()}</span>
              </div>
              <DHIS2Provider>
                {activePage === 'Inventory' && <InventoryPage />}
                {activePage === 'Refill' && <RefillPage />}
                {activePage === 'History' && <HistoryPage />}
                {activePage === 'TrainingPage' && <TrainingPage />}
              </DHIS2Provider>
            </div>
          </div>
        </TrainingModeProvider>
      </AlertProvider>
    </div>
  );
};

export default App;
