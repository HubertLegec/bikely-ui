import React, { useState, useEffect } from 'react';

import { BikelyApi } from '../../api/BikelyApi';

import { Basic } from './Basic';
import { User } from './User';
import { Admin } from './Admin';

export const Nav = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState({});

  function handleUserChange() {
    const profile = BikelyApi.profile;

    setIsAuthenticated(BikelyApi.userHasAuthenticated());
    profile ? setUserRole(profile.role) : setUserRole({});
  }

  useEffect(() => {
    BikelyApi.registerObserver(handleUserChange);
    setIsAuthenticated(BikelyApi.userHasAuthenticated());
    if (BikelyApi.profile) setUserRole(BikelyApi.profile.role);

    return () => {
      BikelyApi.removeObserver(handleUserChange);
    };
  }, []);

  function getProperNavbar() {
    if (isAuthenticated) {
      return userRole === 'User' ? <User /> : <Admin />;
    }

    return <Basic />;
  }

  return getProperNavbar();
};
