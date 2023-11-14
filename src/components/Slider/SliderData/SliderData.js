import Inventory from './Images/Inventory.jpg';
import Refill from './Images/Refill.jpg';
import History from './Images/History.jpg';

const getImageSrc = imagePath => {
  switch (imagePath) {
    case './Images/Inventory.jpg':
      return Inventory;
    case './Images/Refill.jpg':
      return Refill;
    case './Images/History.jpg':
      return History;
    default:
      return imagePath; 
  }
};

export default getImageSrc;