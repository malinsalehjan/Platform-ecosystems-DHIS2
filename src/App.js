import React, { useState } from 'react';
import classes from './App.module.css';
import InventoryPage from './pages/InventoryPage/InventoryPage';
import TrainingPage from './pages/TrainingPage/TrainingPage';
import { DHIS2Provider } from './contexts/DHIS2Context';
import Navigation from './components/Navigation/Navigation';
import { AlertProvider } from './contexts/AlertContext';
import StartCard from './components/PopupCard/StartCard'; 

const App = () => {
  const [activePage, setActivePage] = useState('Inventory');
  const [showStartCard, setShowStartCard] = useState(false); // State to control StartCard visibility

  function activePageHandler(page) {
    setActivePage(page);
    // Show the StartCard when the TrainingPage menu item is clicked
    if (page === 'TrainingPage') {
      setShowStartCard(true);
    } else {
      setShowStartCard(false); // Hide the StartCard when other menu items are clicked
    }
  }

  function closeStartCard() {
    setShowStartCard(false);
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
            {showStartCard && <StartCard onClose={closeStartCard} />}
            {activePage === 'Inventory' && <InventoryPage />}
            {!showStartCard && activePage === 'TrainingPage' && <TrainingPage />}
          </DHIS2Provider>
        </div>
      </AlertProvider>
    </div>
  );
};

export default App;
