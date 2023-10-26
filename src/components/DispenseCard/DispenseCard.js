import React from 'react';
import { Card, Button, InputField, FieldGroup } from '@dhis2/ui';
import Cross from '../../resources/icons/Cross';
import classes from './DispenseCard.module.css';

export default function DispenseCard({
  selectedCommodity,
  setSelectedCommodity,
}) {
  function closeCard() {
    setSelectedCommodity(null);
  }

  return (
    <Card className={classes.container}>
      <Button className={classes.closeButton} onClick={closeCard}>
        <Cross />
      </Button>
      <span>{selectedCommodity.name}</span>
      <FieldGroup>
        <InputField type="number" label="Amount" />
        <InputField type="text" label="Recipient" />
        <Button primary>Dispense</Button>
      </FieldGroup>
    </Card>
  );
}
