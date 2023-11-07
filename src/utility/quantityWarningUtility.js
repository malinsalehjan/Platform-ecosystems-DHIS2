import { daysUntilDelivery } from './dateUtility';

export function generateWarningMessage(selectedQuantity, commodity) {
  const totalQuantity = parseInt(commodity.quantity);
  const name = commodity.name;
  const daysUntilRefill = daysUntilDelivery();
  const averageConsumption = commodity.averageDailyConsumption;
  const bufferSize = commodity.desiredBufferSize;

  const newQuantity = totalQuantity - selectedQuantity;

  // Required quantity to next refill based on average daily consumption
  const requiredQuantity = Math.ceil(averageConsumption * daysUntilRefill);

  // If user wants to dispense all remaining quantity, warn accordingly
  if (selectedQuantity === totalQuantity) {
    return `You are about to dispense all remaining ${name}. There are still ${daysUntilRefill} days left until the next refill.`;
  }

  // If total quantity is less than the quantity required until refill, warn accordingly
  else if (totalQuantity < requiredQuantity) {
    const suggestedDispenseQuantity = Math.ceil(
      totalQuantity / daysUntilRefill,
    );
    return selectedQuantity <= suggestedDispenseQuantity
      ? ''
      : `You have a limited quantity of ${name} left. We recommend dispensing no more than ${suggestedDispenseQuantity} ${name}.`;
  }

  // If total quantity is sufficient, but user wants to dispense more than the average quantity needed until refill, warn accordingly
  else if (
    newQuantity - (averageConsumption * daysUntilRefill - bufferSize) <
    0
  ) {
    const suggestedDispenseQuantity =
      Math.floor(averageConsumption + totalQuantity - requiredQuantity) - 1;
    return `By dispensing ${selectedQuantity} ${name}, you risk running out before the next refill. We recommend dispensing no more than ${suggestedDispenseQuantity} ${name}.`;
  }

  // If user wants to dispense an unusually large quantity, warn accordingly
  else if (selectedQuantity > averageConsumption * 2) {
    return `You are about to dispense a much higher quantity of ${name} than usual. On average, you dispense 
    ${Math.round(averageConsumption)} ${name} per day`;
  }

  // In all other cases, return no warning message
  else {
    return '';
  }
}
