import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import { LoginPage, RegisterPage, UserReservations, RentalPointReservations, ReservationPage } from './pages';
import { PrivateRoute } from './pages/PrivateRoute';
import { Logout } from './pages/Logout';
import { Nav } from './components/Nav/Nav';
import { theme } from './theme/theme';
import { useStyles } from './App.styles';

export const App = () => {
  const classes = useStyles(theme);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
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
            <Route path="/reservations">
              <ReservationPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};
