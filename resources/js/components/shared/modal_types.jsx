import React from 'react';
import { Search } from '../misc';
import { hideModal } from '../../actions';
import useAppState from '../../hooks/useAppState';
import ModalBase from './modal_base';

export const NoModal = () => {
  const [, dispatch] = useAppState();

  hideModal(dispatch);

  return null;
};

export const SearchModal = () => (
  <ModalBase>
    <Search />
  </ModalBase>
);
