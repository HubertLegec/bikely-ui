import React from 'react';
import PropTypes from 'prop-types';

// import logotype from '../../assets/bikely_logo_1.png';

import { useStyles } from './LoginRegisterFormWrapper.styles';

export const LoginRegisterFormWrapper = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.image} />
      {children}
    </>
  );
};

LoginRegisterFormWrapper.propTypes = {
  children: PropTypes.node,
};
