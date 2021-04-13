import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Nav } from './components/forms';
import { LoginPage, RegisterPage } from './pages';
import { Reservations } from './components/reservations';
import { RentPage } from './pages/rentPage/RentPage';

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
        <Route path="/reservations">
          <Reservations />
        </Route>
        <Route path="/rentBikes">
          <RentPage />
        </Route>
      </Switch>
    </Router>
  );
};
