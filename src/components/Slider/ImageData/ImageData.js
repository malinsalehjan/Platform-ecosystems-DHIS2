import Inventory from './Images/Inventory.jpg';
import Refill from './Images/Refill.jpg';
import History from './Images/History.jpg';
import Testingmode from './Images/Testingmode.jpg';

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