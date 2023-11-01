import { getCurrentDate, getCurrentPeriod } from '../utility/dateUtility';
import { DataElementType } from '../types';

export default {
  resource: 'dataValueSets',
  type: 'create',
  data: ({
    elementId,
    newQuantity,
    newConsumedAmount,
    period = getCurrentPeriod(),
    date = getCurrentDate(),
  }) => ({
    dataSet: 'ULowA8V3ucd',
    orgUnit: 'yMCshbaVExv',
    completeDate: date,
    period: period,
    dataValues: [
      {
        dataElement: elementId,
        categoryOptionCombo: DataElementType.CONSUMPTION,
        value: newConsumedAmount.toString(),
      },
      {
        dataElement: elementId,
        categoryOptionCombo: DataElementType.END_BALANCE,
        value: newQuantity.toString(),
      },
    ],
  }),
};
