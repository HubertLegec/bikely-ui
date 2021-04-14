import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import { Nav } from './components/forms';
import { LoginPage, RegisterPage, ReservationPage } from './pages';
import { RentPage } from './pages/rentPage/RentPage';
import { ReturnPage } from './pages/returnPage/ReturnPage';
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
            {/*
            TODO: remove it later; only temporarily solution to reach page from tabs
*/}
            <Route path="/reservations">
              <ReservationPage />
            </Route>
            <Route path="/rentBikes">
              <RentPage />
            </Route>
            <Route path="/returnBikes">
              <ReturnPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};
