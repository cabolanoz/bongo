import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Routes } from '../../const';
import List from './list';
import Show from './show';

const Promenade = () => (
  <Switch>
    <Route path={[Routes.root(), Routes.promenades()]} exact component={List} />
    <Route path={Routes.promenade()} exact component={Show} />
  </Switch>
);

export default Promenade;
