import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Nav } from './components/forms';
import { LoginPage, RegisterPage, UserReservations, RentalPointReservations } from './pages';
import { PrivateRoute } from './pages/PrivateRoute';
import { Logout } from './pages/Logout';

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
        <PrivateRoute roles={['User']} path="/user/reservations">
          <UserReservations />
        </PrivateRoute>
        <PrivateRoute roles={['User', 'Admin']} path="/rental_point/reservations">
          <RentalPointReservations />
        </PrivateRoute>
        <Route path="/logout">
          <Logout />
        </Route>
      </Switch>
    </Router>
  );
};
