import React, { useState } from 'react';
import classes from './App.module.css';
import InventoryPage from './pages/InventoryPage/InventoryPage';
import TrainingPage from './pages/TrainingPage/TrainingPage';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import ReplenishPage from './pages/ReplenishPage/ReplenishPage';
import { DHIS2Provider } from './contexts/DHIS2Context';
import Navigation from './pages/shared/Navigation/Navigation';
import { AlertProvider } from './contexts/AlertContext';
import { daysUntilDelivery } from './utility/dateUtility';
import { IconCalendar16 as CalendarIcon } from '@dhis2/ui';
import TrainingModeIndicator from './pages/shared/TrainingModeIndicator/TrainingModeIndicator';
import TrainingModeSpacer from './pages/shared/TrainingModeSpacer/TrainingModeSpacer';

export default function App() {
  const [activePage, setActivePage] = useState('Inventory');
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className={classes.container}>
      <AlertProvider>
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
              <TrainingModeIndicator
                isOnTrainingPage={activePage === 'TrainingPage'}
              />
              {activePage === 'Inventory' && <InventoryPage />}
              {activePage === 'Replenish' && <ReplenishPage />}
              {activePage === 'History' && <HistoryPage />}
              {activePage === 'TrainingPage' && <TrainingPage />}
              <TrainingModeSpacer />
            </DHIS2Provider>
          </div>
        </div>
      </AlertProvider>
    </div>
  );
}
