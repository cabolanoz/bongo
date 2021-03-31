import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Routes } from '../../const';
import Login from './Login';
import ForgetPassword from './ForgetPassword';
import Signup from './Signup'
import Subscribe from './Subscribe';
import ContactUs from './ContactUs';

const Access = () => (
  <Switch>
    <Route path={Routes.login()} exact component={Login} />
    <Route path={Routes.forgetPassword()} exact component={ForgetPassword} />
    <Route path={Routes.signup()} exact component={Signup} />
    <Route path={Routes.subscribe()} exact component={Subscribe} />
    <Route path={Routes.contactUs()} exact component={ContactUs} />
  </Switch>
);

export default Access;
