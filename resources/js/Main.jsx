import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Routes, ENJOYABLE_ROUTES } from './const';
import { Navbar, Footer, StickySocial } from './components/shared';
import Enjoyable from './components/enjoyable';
import Modal from './components/shared/modal';
import { StateProvider } from './state';
import reducer from './reducers';

const Main = initialState => (
  <StateProvider initialState={initialState} reducer={reducer}>
    <Navbar />
    <Switch>
      <Route path={ENJOYABLE_ROUTES} exact component={Enjoyable} />
      <Redirect to={Routes.root()} />
    </Switch>

    <Footer />
    <StickySocial />
    <Modal />
  </StateProvider>
);

export default Main;
