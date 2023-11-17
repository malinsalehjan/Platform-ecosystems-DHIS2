import React from 'react';
import {
  Modal,
  ModalTitle,
  ModalContent,
  ModalActions,
  ButtonStrip,
  Button,
} from '@dhis2/ui';

const LastCard = ({ onClose, onConfirm }) => {
  return (
    <Modal onClose={onClose} small position="middle">
      <ModalTitle>You have finished all training modules!</ModalTitle>
      <ModalContent>
        Would you like to apply your new knowledge in the training mode?
      </ModalContent>
      <ModalActions>
        <ButtonStrip>
          <Button primary onClick={onConfirm}>
            Try training mode
          </Button>
          <Button onClick={onClose}>No thanks</Button>
        </ButtonStrip>
      </ModalActions>
    </Modal>
  );
};

export default LastCard;
