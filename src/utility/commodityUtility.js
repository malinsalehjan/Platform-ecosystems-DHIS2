import { SortType, SortDirection } from '../types';

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

        return {
          id: commodity.id,
          name: commodity.displayName,
          period: relatedDataValues[0].period,
          consumption: relatedDataValues[0].value,
          quantity: relatedDataValues[1].value,
          toBeOrdered: relatedDataValues[2].value,
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
