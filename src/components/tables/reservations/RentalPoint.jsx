import React, { useContext, useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import { BikelyApi } from '../../../api/BikelyApi';
import { StoreContext } from '../../../states/Store';

import { useStyles } from './reservations.style';

const headCells = [
  { id: 'confirm', numeric: false, disablePadding: true, label: '' },
  { id: 'dateFrom', numeric: false, disablePadding: true, label: 'Planned pickup' },
  { id: 'dateTo', numeric: false, disablePadding: false, label: 'Planned return' },
  { id: 'email', numeric: true, disablePadding: false, label: 'User email' },
  { id: 'bike_type', numeric: false, disablePadding: false, label: 'Bike type' },
  { id: 'bike_isElectric', numeric: false, disablePadding: false, label: 'Bike is electric' },
  { id: 'bike_frameSize', numeric: false, disablePadding: false, label: 'Bike frame size' },
];

export const ReservationsTable = () => {
  const [reservations, setReservations] = useState([]);
  const {
    state: { profile, accessToken },
  } = useContext(StoreContext);
  const classes = useStyles();

  const sortReservations = (reservations) => {
    return reservations.sort((a, b) => a.plannedDateFrom - b.plannedDateFrom);
  };

  useEffect(() => {
    async function fetchRentalPointReservations() {
      const reservations = await BikelyApi.getUserBasedReservations(profile, accessToken);

      if (reservations && reservations.length > 0) setReservations(sortReservations(reservations));
    }

    setReservations(fetchRentalPointReservations());
  }, []);

  function handleClick(event) {
    const button = event.target.tagName === 'BUTTON' ? event.target : event.target.closest('button');

    event.preventDefault();
    setReservations(reservations.filter((reservation) => reservation._id !== button.value));
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle" aria-label="enhanced table">
            <TableHead>
              <TableRow>
                {headCells.map((headCell, index) => (
                  <TableCell key={index}>{headCell.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations && reservations.length > 0 ? (
                reservations.map((reservation) => {
                  return (
                    <TableRow key={reservation._id}>
                      <TableCell>
                        <Button value={reservation._id} variant="contained" color="primary" onClick={handleClick}>
                          Confirm
                        </Button>
                      </TableCell>
                      <TableCell>{new Date(reservation.plannedDateFrom).toDateString()}</TableCell>
                      <TableCell>{new Date(reservation.plannedDateTo).toDateString()}</TableCell>
                      <TableCell>{reservation.user_id.email}</TableCell>
                      <TableCell>{reservation.bike_id.type}</TableCell>
                      <TableCell>{String(reservation.bike_id.isElectric)}</TableCell>
                      <TableCell>{reservation.bike_id.frameSize}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell>{'Nothing to display'}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};
