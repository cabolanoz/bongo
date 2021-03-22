import React from 'react';
import useAppState from '../../hooks/useAppState';
import { ModalName } from '../../const';
import { LoginModal, TermsModal, CollaboratorsModal } from './modal_types';

const Modal = () => {
  const [{ modal = null },] = useAppState();

  document.body.classList.remove('modal-open');
  if (modal) document.body.classList.add('modal-open');

  switch (modal) {
    case ModalName.login:
      return <LoginModal />;
    case ModalName.terms:
      return <TermsModal />;
    case ModalName.collaborators:
      return <CollaboratorsModal />;
    default:
      return null;
  }
};

export default Modal;
