import { Overlay, Modal } from './Modal.styled';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const ModalWindow = ({ onClose, fullImg }) => {
  useEffect(() => {
    window.addEventListener('keydown', turnOffModal);
    return () => {
      window.removeEventListener('keydown', turnOffModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const turnOffModal = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <Modal>
        <img src={fullImg} alt="" />
      </Modal>
    </Overlay>,
    modalRoot
  );
};

export default ModalWindow;
