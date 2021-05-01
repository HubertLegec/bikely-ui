import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { userReducer } from './reducer';

const initialState = {
  profile: localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : {},
  accessToken: localStorage.getItem('accessToken') || '',
};

export const StoreContext = createContext(initialState);

export const Store = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const isAuthenticated = () => {
    return !!state.accessToken;
  };

  console.log(state);

  return <StoreContext.Provider value={{ state, dispatch, isAuthenticated }}>{children}</StoreContext.Provider>;
};

Store.propTypes = {
  children: PropTypes.node.isRequired,
};
