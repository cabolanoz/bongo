import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Routes } from '../../const';
import List from './list';
import Show from './show';

const WeGoodLookings = () => (
  <Switch>
    <Route path={Routes.weGoodLookings()} exact component={List} />
    <Route path={Routes.weGoodLooking()} exact component={Show} />
  </Switch>
);

export default WeGoodLookings;
