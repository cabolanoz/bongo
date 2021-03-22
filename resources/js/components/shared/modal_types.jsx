import React from 'react';
import { Login } from '../forms';
import { Terms, Collaborators } from '../misc';
import { hideModal } from '../../actions';
import useAppState from '../../hooks/useAppState';
import ModalBase from './modal_base';

export const NoModal = () => {
  const [, dispatch] = useAppState();

  hideModal(dispatch);

  return null;
};

export const LoginModal = () => (
  <ModalBase>
    <div className="modal-dialog modal-dialog-centered">
      <Login />
    </div>
  </ModalBase>
);

export const TermsModal = () => (
  <ModalBase>
    <Terms />
  </ModalBase>
);

export const CollaboratorsModal = () => (
  <ModalBase>
    <Collaborators />
  </ModalBase>
);
