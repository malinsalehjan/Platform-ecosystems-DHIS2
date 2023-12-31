import React, { useState, useEffect } from 'react';
import {
  NoticeBox,
  Card,
  Button,
  InputField,
  FieldGroup,
  Chip,
  IconDelete24,
} from '@dhis2/ui';
import classes from './DispenseCard.module.css';
import { useDHIS2 } from '../../../../contexts/DHIS2Context';
import { generateWarningMessage } from '../../../../utility/quantityWarningUtility';
import { useAlert } from '../../../../contexts/AlertContext';
import { getCurrentDateTime } from '../../../../utility/dateUtility';
import { IconCross24 as CrossIcon } from '@dhis2/ui';
import { capitalizeName } from '../../../../utility/nameUtility';

export default function DispenseCard({
  selectedCommodity,
  setSelectedCommodity,
}) {
  const { addAlert } = useAlert();
  const [quantity, setQuantity] = useState({ value: '1', name: '' });
  const [dateTime, setDateTime] = useState(getCurrentDateTime());
  const [wantsToChangeDateTime, setWantsToChangeDateTime] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showRemoveRecipient, setShowRemoveRecipient] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [warning, setWarning] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDelete, setShowDelete] = useState(true);
  const { dispenseCommodity, recipients, deleteRecipient, refetchRecipients } =
    useDHIS2();
  const [allSuggestions, setAllSuggestions] = useState(recipients);
  const selectedDateTime = new Date(dateTime);
  const currentDateTime = new Date(getCurrentDateTime());

  function handleQuantityChange(quantity) {
    const maxQuantity = parseInt(selectedCommodity.quantity);
    const newQuantity = quantity.value === '' ? 1 : parseInt(quantity.value);
    let result = newQuantity > maxQuantity ? maxQuantity : newQuantity;
    result < 1 && (result = 1);
    setQuantity({ value: result.toString(), name: '' });
  }

  function resetCard() {
    setQuantity({ value: '1', name: '' });
    setDateTime(getCurrentDateTime());
    setRecipient('');
    setWantsToChangeDateTime(false);
    setShowSuggestions(true);
    setSuggestions(allSuggestions);
  }

  function handleDispense() {
    if (selectedDateTime > currentDateTime) {
      addAlert('Unable to dispense commodities in the future.', 'critical');
    } else {
      dispenseCommodity(
        selectedCommodity.id,
        parseInt(quantity.value),
        recipient,
        dateTime,
      );
      resetCard();
    }
  }

  const handleInputChange = (e) => {
    const inputValue = e.value;
    setRecipient(inputValue);

    if (inputValue != '' && suggestions?.length == 0) setShowSuggestions(false);
    else setShowSuggestions(true);

    const filteredSuggestions = allSuggestions?.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()),
    );
    setSuggestions(filteredSuggestions);
    setShowDelete(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setRecipient(capitalizeName(suggestion));
    setShowSuggestions(false);
    setShowDelete(false);
  };

  function removeRecipient(toBeRemoved) {
    deleteRecipient(toBeRemoved);
    refetchRecipients();
  }

  function showHideRemove() {
    if (showRemoveRecipient) setShowRemoveRecipient(false);
    else setShowRemoveRecipient(true);
  }

  function closeCard() {
    setSelectedCommodity(null);
  }

  function testValidInput(input) {
    if (input !== '') {
      if (typeof input !== 'string') return true;

      const pattern = /^[a-åA-Å ]+$/;
      return !pattern.test(input);
    }
    return false;
  }

  useEffect(() => {
    setSuggestions(recipients);
    setAllSuggestions(recipients);
  }, [recipients]);

  // When selectedCommodity changes, reset input fields to default values
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
        <CrossIcon />
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
        <div>
          <InputField
            error={testValidInput(recipient) === true}
            label="Recipient"
            name="recipient"
            onChange={(value) => handleInputChange(value)}
            validationText={
              testValidInput(recipient) === true
                ? 'Should only contain letters'
                : undefined
            }
            value={recipient}
          />
        </div>
        <div>
          <div>
            {showDelete && (
              <button
                onClick={() => showHideRemove()}
                title="Remove recipient"
                className={classes.customDelete}
              >
                <IconDelete24 />
              </button>
            )}
          </div>
          <div className={classes.childContainer}>
            {showSuggestions &&
              suggestions?.map((suggestion, index) => (
                <Chip
                  key={`suggestion-${index}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  label={suggestion}
                  onRemove={
                    showRemoveRecipient
                      ? () => removeRecipient(suggestion)
                      : undefined
                  }
                >
                  {capitalizeName(suggestion)}
                </Chip>
              ))}
          </div>
        </div>
        {wantsToChangeDateTime ? (
          <InputField
            type="datetime-local"
            label="Date and time"
            value={dateTime}
            onChange={(date) => setDateTime(date.value)}
          />
        ) : (
          <div className={classes.dateTime}>
            <label>Time of dispensation: </label>
            <span>{dateTime.split(' ').join(', ')}</span>
            <button onClick={() => setWantsToChangeDateTime(true)}>
              change
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
          <Button disabled={recipient === ''} primary onClick={handleDispense}>
            Confirm dispense
          </Button>
        )}
      </FieldGroup>
    </Card>
  );
}
