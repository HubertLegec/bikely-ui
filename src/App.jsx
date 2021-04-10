import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import { Nav } from './components/forms';
import { LoginPage, RegisterPage } from './pages';
import { theme } from './theme/theme';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Nav />
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
