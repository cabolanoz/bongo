import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Routes } from './const';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import { StateProvider } from './state';
import reducer from './reducers';

const Main = initialState => (
  <StateProvider initialState={initialState} reducer={reducer}>
    <Navbar />
    <Switch>
      <Redirect to={Routes.root()} />
    </Switch>

    <Footer />
  </StateProvider>
);

export default Main;
