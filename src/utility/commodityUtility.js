import { SortType, SortDirection } from '../types';
import { DataElementType } from '../types';

export function formatCommodities(
  data,
  keyword = '',
  sortedBy = { type: SortType.NAME, direction: SortType.ASCENDING },
) {
  // Extract the commodity details in order to map IDs to names
  const commodityDetails = data.commodityDetails.dataSetElements.map(
    (commodity) => {
      return {
        ...commodity.dataElement,
        displayName: commodity.dataElement.displayName.split('-')[1].trim(),
      };
    },
  );

  return (
    commodityDetails

      // Restructure the data for easier use
      .map((commodity) => {
        const relatedDataValues = data.commodityDataElements.dataValues
          .filter((dataValue) => dataValue.dataElement === commodity.id)
          .map((dataValue) => {
            return {
              value: dataValue.value,
              period: dataValue.period,
            };
          });

        // Map the consumption history to each commodity
        const relatedConsumptionHistory =
          data.consumptionHistory.dataValues.filter((dataValue) => {
            return (
              dataValue.dataElement === commodity.id &&
              dataValue.categoryOptionCombo === DataElementType.CONSUMPTION
            );
          });

        // Calculate the average daily consumption
        const totalMonthlyConsumption = relatedConsumptionHistory.reduce(
          (sum, month) => {
            return sum + parseInt(month.value);
          },
          0,
        );
        const averageMonthlyConsumption =
          totalMonthlyConsumption / relatedConsumptionHistory.length;
        const averageDailyConsumption = averageMonthlyConsumption / 30;

        return {
          id: commodity.id,
          name: commodity.displayName,
          period: relatedDataValues[0].period,
          consumption: relatedDataValues[0].value,
          quantity: relatedDataValues[1].value,
          toBeOrdered: relatedDataValues[2].value,
          averageDailyConsumption,
          desiredBufferSize: 5, // This could be set by the manager or based on historical data in the future
        };
      })

      // Filter out commodities that do not match keyword from search field
      .filter((commodity) => {
        return commodity.name.toLowerCase().includes(keyword.toLowerCase());
      })

      // Sort the commodities based on the selected sort type and direction
      .sort((a, b) => {
        let result = 0;
        if (sortedBy.type === SortType.NAME) {
          result = a.name.localeCompare(b.name);
        } else if (sortedBy.type === SortType.QUANTITY) {
          result = a.quantity - b.quantity;
        }

        if (sortedBy.direction === SortDirection.DESCENDING) {
          result *= -1;
        }

        return result;
      })
  );
}
