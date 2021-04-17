import React from 'react';
import { Grid, Paper } from '@material-ui/core';

import { ReservationsTable } from '../../components/tables/reservations/RentalPoint';

import { useStyles } from './reservations.styles';

export const RentalPointReservations = () => {
  const classes = useStyles();

  return (
    <Grid alignItems="center" style={{ minHeight: '100vh' }} container>
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
