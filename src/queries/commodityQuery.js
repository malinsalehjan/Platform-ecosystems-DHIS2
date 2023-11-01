export default {
  commodityDataElements: {
    resource: 'dataValueSets',
    params: {
      orgUnit: 'yMCshbaVExv',
      dataSet: 'ULowA8V3ucd',
      period: '202310',
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
