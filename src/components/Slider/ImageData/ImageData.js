import {Inventory, Inventory1, Inventory2, Inventory3, Inventory4, Inventory5} from './Images/Inventory/Inventory.jpg';
import Refill from './Images/Refill/Refill.jpg';
import History from './Images/History/History.jpg';
import Testingmode from './Images/Testingmode/Testingmode.jpg';

const getImageSrc = imagePath => {
  switch (imagePath) {
    case './Images/Inventory.jpg':
      return Inventory;
    case './Images/Refill.jpg':
      return Refill;
    case './Images/History.jpg':
      return History;
    case './Images/Testingmode.jpg':
      return Testingmode;
    default:
      return imagePath; 
  }
};

export default getImageSrc;