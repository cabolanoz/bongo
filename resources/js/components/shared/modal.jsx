import React, { useEffect } from 'react';
import { hideModal } from '../../actions';
import useAppState from '../../hooks/useAppState';
import { ModalName } from '../../const';
import { SearchModal } from './modal_types';

const Modal = () => {
  const [{ modal = null }, dispatch] = useAppState();

  document.body.classList.remove('modal-open');
  if (modal) document.body.classList.add('modal-open');

  useEffect(() => {
    const onKeyPressed = ({ keyCode }) => {
      if (keyCode === 27) hideModal(dispatch);
    };

    document.addEventListener('keydown', onKeyPressed);

    return () => document.removeEventListener('keydown', onKeyPressed);
  }, [modal]);

  switch (modal) {
    case ModalName.search:
      return <SearchModal />;
    default:
      return null;
  }
};

export default Modal;
