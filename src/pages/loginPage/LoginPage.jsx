import React from 'react';
import { Paper } from '@material-ui/core';

import { LoginForm } from '../../components/forms';

import { useStyles } from './LoginPage.styles';

export const LoginPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <LoginForm />
      </Paper>
    </div>
  );
};
