import Inventory1 from './Images/Inventory/Inventory1.jpg';
import Inventory2 from './Images/Inventory/Inventory2.jpg';
import Inventory3 from './Images/Inventory/Inventory3.jpg';
import Inventory4 from './Images/Inventory/Inventory4.jpg';
import Inventory5 from './Images/Inventory/Inventory5.jpg';
import Inventory6 from './Images/Inventory/Inventory6.jpg';
import Inventory7 from './Images/Inventory/Inventory7.jpg';


import Replenish1 from './Images/Replenish/Replenish1.jpg';
import Replenish2 from './Images/Replenish/Replenish2.jpg';
import Replenish3 from './Images/Replenish/Replenish3.jpg';
import Replenish4 from './Images/Replenish/Replenish4.jpg';
import Replenish5 from './Images/Replenish/Replenish5.jpg';

import History1 from './Images/History/History1.jpg';
import History2 from './Images/History/History2.jpg';
import History3 from './Images/History/History3.jpg';
import History4 from './Images/History/History4.jpg';

import Testingmode1 from './Images/Testingmode/Testingmode1.jpg';
import Testingmode2 from './Images/Testingmode/Testingmode2.jpg';
import Testingmode3 from './Images/Testingmode/Testingmode3.jpg';
import Testingmode4 from './Images/Testingmode/Testingmode4.jpg';

const imageMapping = {
  // Inventory images
  './Images/Inventory/Inventory1.jpg': Inventory1,
  './Images/Inventory/Inventory2.jpg': Inventory2,
  './Images/Inventory/Inventory3.jpg': Inventory3,
  './Images/Inventory/Inventory4.jpg': Inventory4,
  './Images/Inventory/Inventory5.jpg': Inventory5,
  './Images/Inventory/Inventory6.jpg': Inventory6,
  './Images/Inventory/Inventory7.jpg': Inventory7,


  // Replenish images
  './Images/Replenish/Replenish1.jpg': Replenish1,
  './Images/Replenish/Replenish2.jpg': Replenish2,
  './Images/Replenish/Replenish3.jpg': Replenish3,
  './Images/Replenish/Replenish4.jpg': Replenish4,
  './Images/Replenish/Replenish5.jpg': Replenish5,

  // History images
  './Images/History/History1.jpg': History1,
  './Images/History/History2.jpg': History2,
  './Images/History/History3.jpg': History3,
  './Images/History/History4.jpg': History4,

  // Testing mode images
  './Images/Testingmode/Testingmode1.jpg': Testingmode1,
  './Images/Testingmode/Testingmode2.jpg': Testingmode2,
  './Images/Testingmode/Testingmode3.jpg': Testingmode3,
  './Images/Testingmode/Testingmode4.jpg': Testingmode4,
};

const getImageSrc = (imagePath) => {
  return imageMapping[imagePath] || imagePath;
};

export default getImageSrc;
