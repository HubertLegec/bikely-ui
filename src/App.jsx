import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import { LoginPage, RegisterPage, UserReservations, RentalPointReservations, ReservationPage } from './pages';
import { PrivateRoute } from './pages/PrivateRoute';
import { Logout } from './pages/Logout';
import { Nav } from './components/Nav/Nav';
import { RentPage } from './pages/rentPage/RentPage';
import { ReturnPage } from './pages/returnPage/ReturnPage';
import { theme } from './theme/theme';
import { useStyles } from './App.styles';
import { Store } from './states/Store';

export const App = () => {
  const classes = useStyles(theme);

  return (
    <Store>
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
              <PrivateRoute roles={['User']} path="/reservations">
                <ReservationPage />
              </PrivateRoute>
              <PrivateRoute roles={['Admin']} path="/rentBikes">
                <RentPage />
              </PrivateRoute>
              <PrivateRoute roles={['Admin']} path="/returnBikes">
                <ReturnPage />
              </PrivateRoute>
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    </Store>
  );
};
