import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  Routes,
  PROMENADE_ROUTES,
  CHITCHAT_ROUTES,
  WE_GOOD_LOOKING_ROUTES,
  EXTRA_ROUTES,
  ACCESS_ROUTES,
} from './const';
import { Navbar, Footer, StickySocial } from './components/shared';
import Promenade from './components/promenade';
import Chitchat from './components/chitchat';
import WeGoodLooking from './components/we_good_looking';
import Extra from './components/extra';
import Access from './components/access';
import { ScrollToTop } from './utils';
import Modal from './components/shared/modal';
import { StateProvider } from './state';
import reducer from './reducers';

const Main = initialState => (
  <StateProvider initialState={initialState} reducer={reducer}>
    <Navbar />
    <Switch>
      <Route path={PROMENADE_ROUTES} exact component={Promenade} />
      <Route path={CHITCHAT_ROUTES} exact component={Chitchat} />
      <Route path={WE_GOOD_LOOKING_ROUTES} exact component={WeGoodLooking} />
      <Route path={EXTRA_ROUTES} exact component={Extra} />
      <Route path={ACCESS_ROUTES} exact component={Access} />
      <Redirect to={Routes.root()} />
    </Switch>

    <Footer />
    <StickySocial />
    <ScrollToTop />
    <Modal />
  </StateProvider>
);

export default Main;
