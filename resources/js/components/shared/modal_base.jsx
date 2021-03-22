import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { hideModal } from '../../actions';
import useAppState from '../../hooks/useAppState';

import '../../styles/modal.scss';

const ModalBase = ({ children, className }) => {
  const [{ modal = null }, dispatch] = useAppState();
  const isVisible = modal !== null;

  const onClose = () => {
    hideModal(dispatch);
  };

  useEffect(() => {
    const onKeyPressed = ({ keyCode }) => {
      if (keyCode === 27) onClose;
    };

    document.addEventListener('keydown', onKeyPressed);

    return () => document.removeEventListener('keydown', onKeyPressed);
  }, [isVisible]);

  const modalClassName = classNames('modal-container', className);

  return ReactDOM.createPortal(
    <div className={modalClassName} role="modal">
      <div className="modal-overlay" />
      <div className="modal-close" onClick={onClose}></div>
      {children}
    </div>,
    document.body
  );
};

export default ModalBase;
