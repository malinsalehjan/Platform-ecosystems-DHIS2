import inventory1 from '../images/inventory/Inventory1.jpg';
import inventory2 from '../images/inventory/Inventory2.jpg';
import inventory3 from '../images/inventory/Inventory3.jpg';
import inventory4 from '../images/inventory/Inventory4.jpg';
import inventory5 from '../images/inventory/Inventory5.jpg';
import inventory6 from '../images/inventory/Inventory6.jpg';
import inventoryRibbon from '../images/inventory/Inventory7.jpg';

import replenish1 from '../images/replenish/Replenish1.jpg';
import replenish2 from '../images/replenish/Replenish2.jpg';
import replenish3 from '../images/replenish/Replenish3.jpg';
import replenish4 from '../images/replenish/Replenish4.jpg';
import replenishRibbon from '../images/replenish/Replenish5.jpg';

import history1 from '../images/history/History1.jpg';
import history2 from '../images/history/History2.jpg';
import history3 from '../images/history/History3.jpg';
import historyRibbon from '../images/history/History4.jpg';

import training1 from '../images/training/Trainingmode1.jpg';
import training2 from '../images/training/Trainingmode2.jpg';
import training3 from '../images/training/Trainingmode3.jpg';
import training4 from '../images/training/Trainingmode4.jpg';
import trainingRibbon from '../images/training/Trainingmode4.jpg';

export default [
  {
    id: 0,
    title: '01 Dispensing a Commodity',
    images: [
      inventory1,
      inventory2,
      inventory3,
      inventory4,
      inventory5,
      inventory6,
      inventoryRibbon,
    ],
  },
  {
    id: 1,
    title: '02 Replenishing a Commodity',
    images: [replenish1, replenish2, replenish3, replenish4, replenishRibbon],
  },
  {
    id: 2,
    title: '03 Searching in History',
    images: [history1, history2, history3, historyRibbon],
  },
  {
    id: 3,
    title: '04 Using Training Mode',
    images: [training1, training2, training3, training4, trainingRibbon],
  },
];
