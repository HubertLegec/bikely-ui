import React, { useContext, useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import { BikelyApi } from '../../../api/BikelyApi';
import { StoreContext } from '../../../states/Store';

import { useStyles } from './reservations.style';

const headCells = [
  { id: 'dateFrom', numeric: false, disablePadding: true, label: 'Planned pickup' },
  { id: 'dateTo', numeric: false, disablePadding: false, label: 'Planned return' },
  { id: 'from', numeric: false, disablePadding: true, label: 'From' },
  { id: 'to', numeric: false, disablePadding: false, label: 'To' },
  { id: 'email', numeric: true, disablePadding: false, label: 'User email' },
  { id: 'bike_type', numeric: false, disablePadding: false, label: 'Bike type' },
  { id: 'bike_isElectric', numeric: false, disablePadding: false, label: 'Bike is electric' },
  { id: 'bike_frameSize', numeric: false, disablePadding: false, label: 'Bike frame size' },
];

export const ReservationsTable = () => {
  const [reservations, setReservations] = useState([]);
  const classes = useStyles();
  const { profile, accessToken } = useContext(StoreContext);

  const sortReservations = (reservations) => {
    return reservations.sort((a, b) => a.plannedDateFrom - b.plannedDateFrom);
  };

  useEffect(() => {
    (async function () {
      const reservations = await BikelyApi.getUserBasedReservations(profile, accessToken);

      if (reservations && reservations.length > 0) setReservations(sortReservations(reservations));
    })();
  }, []);

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
              {reservations.length > 0 ? (
                reservations.map((reservation) => {
                  return (
                    <TableRow key={reservation.id}>
                      <TableCell>{new Date(reservation.plannedDateFrom).toDateString()}</TableCell>
                      <TableCell>{new Date(reservation.plannedDateTo).toDateString()}</TableCell>
                      <TableCell>{reservation.rentalPointFrom_id.location}</TableCell>
                      <TableCell>{reservation.rentalPointTo_id.location}</TableCell>
                      <TableCell>{String(reservation.bike_id.isElectric)}</TableCell>
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
