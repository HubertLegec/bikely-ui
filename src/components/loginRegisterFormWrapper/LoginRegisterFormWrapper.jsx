import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core';

import { useStyles } from './LoginRegisterFormWrapper.styles';

export const LoginRegisterFormWrapper = ({ children }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

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
