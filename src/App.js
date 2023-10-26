import React, { useState } from 'react';
import classes from './App.module.css';
import InventoryPage from './pages/InventoryPage/InventoryPage';
import { DHIS2Provider } from './contexts/DHIS2Context';
import Navigation from './components/Navigation/Navigation';

const MyApp = () => {
  const [activePage, setActivePage] = useState('Inventory');

  function activePageHandler(page) {
    setActivePage(page);
  }

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <Navigation
          activePage={activePage}
          activePageHandler={activePageHandler}
        />
      </div>
      <div className={classes.right}>
        <DHIS2Provider>
          <InventoryPage />
        </DHIS2Provider>
      </div>
    </div>
  );
};

export default MyApp;
