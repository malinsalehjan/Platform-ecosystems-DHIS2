import React from 'react';
import {
  Modal,
  ModalTitle,
  ModalContent,
  ModalActions,
  ButtonStrip,
  Button,
} from '@dhis2/ui';

const TrainingModeConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <Modal onClose={onClose} small position="middle">
      <ModalTitle>You are about to enter training mode</ModalTitle>
      <ModalContent>
        This will allow you to test the store manager. The changes you make in
        training mode will not be saved
      </ModalContent>
      <ModalActions>
        <ButtonStrip end>
          <Button primary onClick={onConfirm}>
            Enable training mode
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ButtonStrip>
      </ModalActions>
    </Modal>
  );
};

export default TrainingModeConfirmationModal;
