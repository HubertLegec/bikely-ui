import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Nav } from './components/forms';
import { LoginPage, RegisterPage, ReservationsPage } from './pages';
import { PrivateRoute } from './pages/PrivateRoute';

export const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <PrivateRoute roles={['User', 'Admin']} path="/reservations">
          <ReservationsPage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};
