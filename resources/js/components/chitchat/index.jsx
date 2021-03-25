import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Routes } from '../../const';
import List from './list';
import Show from './show';

const Chitchat = () => (
  <Switch>
    <Route path={Routes.chitchats()} exact component={List} />
    <Route path={Routes.chitchat()} exact component={Show} />
  </Switch>
);

export default Chitchat;
