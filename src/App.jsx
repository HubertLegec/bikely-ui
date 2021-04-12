import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import { Nav } from './components/nav/Nav';
import { LoginPage, RegisterPage } from './pages';
import { theme } from './theme/theme';
import { useStyles } from './App.styles';
import { ReservationPage } from './pages/reservationPage/ReservationPage';

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
            <Route path="/reservations">
              <ReservationPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};
