import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Routes } from '../../const';
import { Terms, Collaborators } from '../misc';

const Extra = () => (
  <div className="bg-light">
    <Switch>
      <Route path={Routes.terms()} exact component={Terms} />
      <Route path={Routes.collaborators()} exact component={Collaborators} />
    </Switch>
  </div>
);

export default Extra;
