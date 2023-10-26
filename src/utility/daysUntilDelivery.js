const dayOfDelivery = 14;

export const daysUntilDelivery = () => {
  const today = new Date();
  const currentDay = today.getDate();
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();

  return currentDay <= dayOfDelivery
    ? dayOfDelivery - currentDay
    : daysInMonth - currentDay + dayOfDelivery;
};
