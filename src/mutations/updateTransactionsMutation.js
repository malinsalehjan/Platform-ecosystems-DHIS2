export default {
  resource: 'dataStore/IN5320-G6/TransactionData',
  type: 'update',
  data: ({ transactions }) => ({
    transactions: transactions,
  }),
};
