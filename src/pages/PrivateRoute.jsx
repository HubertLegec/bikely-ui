/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { BikelyApi } from '../api/BikelyApi';

export const PrivateRoute = ({ children, roles, ...rest }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    setUserProfile(BikelyApi.profile);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!BikelyApi.userHasAuthenticated()) {
          return <Redirect to={{ pathname: '/login' }} />;
        }

        if (userProfile === null) return '';

        if (!userProfile) {
          return 'Unauthorized';
        } else if (!roles.includes(userProfile.role)) {
          return 'Forbidden';
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
