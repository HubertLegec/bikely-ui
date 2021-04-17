import React from 'react';
import { Grid, Paper } from '@material-ui/core';

import { ReservationsTable } from '../../components/tables/reservations/User';

import { useStyles } from './reservations.styles';

export const UserReservations = () => {
  const classes = useStyles();

  return (
    <Grid alignItems="center" justify="center" style={{ minHeight: '100vh' }} container spacing={0}>
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <Paper className={classes.paper}>
          <ReservationsTable />
        </Paper>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};
