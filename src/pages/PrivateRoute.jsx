/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { BikelyApi } from '../api/BikelyApi';

export const PrivateRoute = ({ children, roles, ...rest }) => {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    (async () => {
      setUserProfile(await BikelyApi.getProfile());
    })();
  });

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!BikelyApi.userHasAuthenticated()) {
          return <Redirect to={{ pathname: '/login' }} />;
        }

        if (!roles.includes(userProfile.role)) {
          return '';
        }

        return children;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  roles: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
};
