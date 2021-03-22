import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Routes } from './const';
import { Navbar, Footer } from './components/shared';
import Modal from './components/shared/modal';
import { StateProvider } from './state';
import reducer from './reducers';

const Main = initialState => (
  <StateProvider initialState={initialState} reducer={reducer}>
    <Navbar />
    <Switch>
      <Redirect to={Routes.root()} />
    </Switch>

    <Footer />
    <Modal />
  </StateProvider>
);

export default Main;
