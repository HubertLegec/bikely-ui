import React, { useState, useEffect } from 'react';
import { AppBar } from '@material-ui/core';

import { userState } from '../../states/user';

import { Basic } from './Basic';
import { User } from './User';
import { Admin } from './Admin';
import { useStyles } from './Nav.style';

export const Nav = () => {
  const classes = useStyles();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  function handleUserChange() {
    const profile = userState.profile;

    setIsAuthenticated(userState.isAuthenticated());
    profile ? setUserRole(profile.role) : setUserRole('');
  }

  useEffect(() => {
    userState.registerObserver(handleUserChange);
    setIsAuthenticated(userState.isAuthenticated());
    if (userState.profile) setUserRole(userState.profile.role);

    return () => {
      userState.removeObserver(handleUserChange);
    };
  }, []);

  function getProperNavbar() {
    if (isAuthenticated) {
      return userRole === 'User' ? <User /> : <Admin />;
    }

    return <Basic />;
  }

  return (
    <AppBar className={classes.nav} position="sticky">
      {getProperNavbar()}
    </AppBar>
  );
};
