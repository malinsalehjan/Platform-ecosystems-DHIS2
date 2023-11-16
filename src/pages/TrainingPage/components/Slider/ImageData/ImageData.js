import Inventory1 from './Images/Inventory/Inventory1.jpg';
import Inventory2 from './Images/Inventory/Inventory2.jpg';
import Inventory3 from './Images/Inventory/Inventory3.jpg';
import Inventory4 from './Images/Inventory/Inventory4.jpg';
import Inventory5 from './Images/Inventory/Inventory5.jpg';
import Inventory6 from './Images/Inventory/Inventory6.jpg';

import Refill1 from './Images/Refill/Refill1.jpg';
import Refill2 from './Images/Refill/Refill2.jpg';
import Refill3 from './Images/Refill/Refill3.jpg';
import Refill4 from './Images/Refill/Refill4.jpg';
import Refill5 from './Images/Refill/Refill5.jpg';

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

  // Refill images
  './Images/Refill/Refill1.jpg': Refill1,
  './Images/Refill/Refill2.jpg': Refill2,
  './Images/Refill/Refill3.jpg': Refill3,
  './Images/Refill/Refill4.jpg': Refill4,
  './Images/Refill/Refill5.jpg': Refill5,

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
