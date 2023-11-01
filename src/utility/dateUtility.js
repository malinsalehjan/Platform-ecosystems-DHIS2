export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const day = date.getDate();
  const dayString = day < 10 ? `0${day}` : day;

  return `${year}-${month < 10 ? `0${month}` : month}-${dayString}`;
};

export const getCurrentPeriod = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return `${year}${month < 10 ? `0${month}` : month}`;
};

export const daysUntilDelivery = () => {
  const dayOfDelivery = 14;

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

export const getTimeStamp = () => {
  const date = new Date();
  let getHours = date.getHours();
  let getMinutes = date.getMinutes();

  return `${getHours < 10 ? `0${getHours}` : getHours}:${
    getMinutes < 10 ? `0${getMinutes}` : getMinutes
  }`;
};
