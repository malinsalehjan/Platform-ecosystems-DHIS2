import { getCurrentPeriod, getCurrentYear } from '../utility/dateUtility';

export default {
  consumptionHistory: {
    resource: 'dataValueSets',
    params: {
      orgUnit: 'yMCshbaVExv',
      dataSet: 'ULowA8V3ucd',
      startDate: 2022,
      endDate: parseInt(getCurrentYear()) + 1,
    },
  },
  commodityDataElements: {
    resource: 'dataValueSets',
    params: {
      orgUnit: 'yMCshbaVExv',
      dataSet: 'ULowA8V3ucd',
      period: getCurrentPeriod(),
    },
  },
  commodityDetails: {
    resource: '/dataSets/ULowA8V3ucd',
    params: {
      fields: 'dataSetElements[dataElement[id,displayName]]',
      paging: false,
    },
  },
  transactions: {
    resource: 'dataStore/IN5320-G6/TransactionData',
    params: {
      fields: 'transactions',
      paging: false,
    },
  },
};
