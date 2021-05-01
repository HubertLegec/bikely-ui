/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { StoreContext } from '../states/Store';

export const PrivateRoute = ({ children, roles, ...rest }) => {
  const {
    state: { profile: { role } = null },
    isAuthenticated,
  } = useContext(StoreContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated()) {
          return <Redirect to={{ pathname: '/login' }} />;
        }

        if (role === null) return '';

        if (!role) {
          return 'Unauthorized';
        } else if (!roles.includes(role)) {
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
