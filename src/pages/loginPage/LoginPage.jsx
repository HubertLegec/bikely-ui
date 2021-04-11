import React from 'react';
import { Grid, Paper } from '@material-ui/core';

import { LoginForm } from '../../components/forms';

import { useStyles } from './LoginPage.styles';

export const LoginPage = () => {
  const classes = useStyles();

  return (
    <Grid alignItems="center" justify="center" style={{ minHeight: '100vh' }} container spacing={0}>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <LoginForm />
        </Paper>
      </Grid>
    </Grid>
  );
};
