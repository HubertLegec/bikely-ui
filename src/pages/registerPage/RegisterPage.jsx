import React from 'react';
import { Grid, Paper } from '@material-ui/core';

import { RegisterForm } from '../../components/forms';

import { useStyles } from './RegisterPage.styles';

export const RegisterPage = () => {
  const classes = useStyles();

  return (
    <Grid alignItems="center" justify="center" style={{ minHeight: '100vh' }} container spacing={0}>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <RegisterForm />
        </Paper>
      </Grid>
    </Grid>
  );
};
