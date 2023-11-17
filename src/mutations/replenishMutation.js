import { getCurrentDate, getCurrentPeriod } from '../utility/dateUtility';
import { DataElementType } from '../types';

export default {
  resource: 'dataValueSets',
  type: 'create',
  data: ({
    idQuantityPairs,
    period = getCurrentPeriod(),
    date = getCurrentDate(),
  }) => ({
    dataSet: 'ULowA8V3ucd',
    orgUnit: 'yMCshbaVExv',
    completeDate: date,
    period: period,
    dataValues: idQuantityPairs.map((pair) => {
      return {
        dataElement: pair.id,
        categoryOptionCombo: DataElementType.END_BALANCE,
        value: pair.quantity.toString(),
      };
    }),
  }),
};
