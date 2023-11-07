import React, { useState, useEffect } from 'react';
import { NoticeBox, Card, Button, InputField, FieldGroup } from '@dhis2/ui';
import Cross from '../../resources/icons/Cross';
import classes from './DispenseCard.module.css';
import { useDHIS2 } from '../../contexts/DHIS2Context';
import { getCurrentDate } from '../../utility/dateUtility';
import { generateWarningMessage } from '../../utility/quantityWarningUtility';

export default function DispenseCard({
  selectedCommodity,
  setSelectedCommodity,
}) {
  const [quantity, setQuantity] = useState({ value: '1', name: '' });
  const [date, setDate] = useState(getCurrentDate());
  const [wantsToChangeDate, setWantsToChangeDate] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [warning, setWarning] = useState('');

  const { dispenseCommodity } = useDHIS2();

  function handleQuantityChange(quantity) {
    const maxQuantity = parseInt(selectedCommodity.quantity);
    const newQuantity = quantity.value === '' ? 1 : parseInt(quantity.value);
    let result = newQuantity > maxQuantity ? maxQuantity : newQuantity;
    result < 1 && (result = 1);
    setQuantity({ value: result.toString(), name: '' });
  }

  function resetCard() {
    setQuantity({ value: '1', name: '' });
    setDate(getCurrentDate());
    setRecipient('');
    setWantsToChangeDate(false);
  }

  function handleDispense() {
    dispenseCommodity(
      selectedCommodity.id,
      parseInt(quantity.value),
      recipient,
      date,
    );
    resetCard();
  }

  function closeCard() {
    setSelectedCommodity(null);
  }

  // When selected commodity changes, reset card so that information does not carry over
  useEffect(() => {
    resetCard();
  }, [selectedCommodity]);

  // When quantity changes, generate warning message if necessary
  useEffect(() => {
    setWarning(
      generateWarningMessage(parseInt(quantity.value), selectedCommodity),
    );
  }, [quantity]);

  return (
    <Card className={classes.container}>
      <Button
        className={classes.closeButton}
        onClick={closeCard}
        disabled={selectedCommodity.quantity === '0'}
      >
        <Cross />
      </Button>
      <span>{selectedCommodity.name}</span>
      <FieldGroup>
        <div className={classes.quantityInput}>
          <InputField
            type="number"
            label="Amount"
            value={quantity.value}
            onChange={(value) => handleQuantityChange(value)}
          />
          <span>
            <span>{quantity.value}</span>
            <span className={classes.maxQuantity}>
              {' / ' + selectedCommodity.quantity}
            </span>
          </span>
        </div>
        <InputField
          type="text"
          label="Recipient"
          value={recipient}
          onChange={(recipient) => setRecipient(recipient.value)}
        />
        {wantsToChangeDate ? (
          <InputField
            type="date"
            label="Date"
            value={date}
            onChange={(date) => setDate(date.value)}
          />
        ) : (
          <div className={classes.date}>
            <label>Date of dispensation: </label>
            <span>{date}</span>
            <button onClick={() => setWantsToChangeDate(true)}>
              change date
            </button>
          </div>
        )}
        {warning !== '' ? (
          <div>
            <NoticeBox warning>{warning}</NoticeBox>
            <Button className={classes.warningButton} onClick={handleDispense}>
              I understand, dispense anyways
            </Button>
          </div>
        ) : (
          <Button primary onClick={handleDispense}>
            Dispense
          </Button>
        )}
      </FieldGroup>
    </Card>
  );
}
