import { v4 as uuid } from 'uuid';
import { SortType, SortDirection } from '../types';

export function formatTransactions(
  transactions,
  keyword = '',
  sortedBy = { type: SortType.NAME, direction: SortType.ASCENDING },
) {
  return (
    transactions
      // Filter out transactions that do not match keyword from search field
      .filter((transaction) => {
        return (
          'commodities' in transaction ||
          transaction?.commodity
            ?.toLowerCase()
            ?.includes(keyword.toLowerCase()) ||
          transaction?.recipient?.toLowerCase()?.includes(keyword.toLowerCase())
        );
      })

      // Sort the transactions based on the selected sort type and direction
      .sort((a, b) => {
        let result = 0;
        if (sortedBy.type === SortType.NAME) {
          result = a.commodity?.localeCompare(b.commodity);
        } else if (sortedBy.type === SortType.QUANTITY) {
          result = a.amount - b.amount;
        } else if (sortedBy.type === SortType.DATETIME) {
          result = a.datetime?.localeCompare(b.datetime);
        } else if (sortedBy.type === SortType.TYPE) {
          result = a.type?.localeCompare(b.type);
        } else if (sortedBy.type === SortType.RECIPIENT) {
          result = a.recipient?.localeCompare(b.recipient);
        }

        if (sortedBy.direction === SortDirection.DESCENDING) {
          result *= -1;
        }

        return result;
      })
  );
}

export function createDispenseTransactionDTO(
  commodity,
  amount,
  dispensedBy,
  recipient,
  datetime,
  previousTransactions,
) {
  return {
    transactions: [
      {
        id: uuid(),
        type: 'out',
        commodity,
        amount,
        dispensedBy,
        recipient,
        datetime,
      },
      ...previousTransactions,
    ],
  };
}

export function createReplenishTransactionDTO(
  nameQuantityPairs,
  datetime,
  previousTransactions,
) {
  return {
    transactions: [
      {
        id: uuid(),
        type: 'in',
        commodities: nameQuantityPairs,
        datetime,
      },
      ...previousTransactions,
    ],
  };
}
