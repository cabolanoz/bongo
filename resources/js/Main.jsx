import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  Routes,
  WE_GOOD_LOOKING_ROUTES,
  EXTRA_ROUTES,
} from './const';
import { Navbar, Footer, StickySocial } from './components/shared';
import Enjoyable from './components/enjoyable';
import WeGoodLooking from './components/we_good_looking';
import Extra from './components/extra';
import Modal from './components/shared/modal';
import { StateProvider } from './state';
import reducer from './reducers';

const Main = initialState => (
  <StateProvider initialState={initialState} reducer={reducer}>
    <Navbar />
    <Switch>
      <Route path={Routes.root()} exact component={Enjoyable} />
      <Route path={WE_GOOD_LOOKING_ROUTES} exact component={WeGoodLooking} />
      <Route path={EXTRA_ROUTES} exact component={Extra} />
      <Redirect to={Routes.root()} />
    </Switch>

    <Footer />
    <StickySocial />
    <Modal />
  </StateProvider>
);

export default Main;
