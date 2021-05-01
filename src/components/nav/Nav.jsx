import React, { useContext } from 'react';
import { AppBar } from '@material-ui/core';

import { StoreContext } from '../../states/Store';

import { Basic } from './Basic';
import { User } from './User';
import { Admin } from './Admin';
import { useStyles } from './Nav.style';

export const Nav = () => {
  const classes = useStyles();
  const { state, isAuthenticated } = useContext(StoreContext);

  function getProperNavbar() {
    if (isAuthenticated() && state.profile.role) {
      return state.profile.role === 'User' ? <User /> : <Admin />;
    }

    return <Basic />;
  }

  return (
    <AppBar className={classes.nav} position="sticky">
      {getProperNavbar()}
    </AppBar>
  );
};
