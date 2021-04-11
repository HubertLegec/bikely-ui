import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import { BikelyApi } from '../../api/BikelyApi';

import { useStyles } from './ReservationTable.style';

const headCells = [
  { id: 'type', numeric: false, disablePadding: true, label: 'Planned pickup' },
  { id: 'isElectric', numeric: false, disablePadding: false, label: 'Planned return' },
  { id: 'size', numeric: true, disablePadding: false, label: 'User id' },
  { id: 'pickupLocation', numeric: false, disablePadding: false, label: 'Bike id' },
];

export const ReservationsTable = () => {
  const [reservations, setReservations] = useState([]);
  const classes = useStyles();

  const sortReservations = (reservations) => {
    return reservations.sort((a, b) => a.plannedDateFrom - b.plannedDateFrom);
  };

  useEffect(() => {
    (async function () {
      const reservations = await BikelyApi.getReservations({ userId: true });
      if (reservations) setReservations(sortReservations(reservations));
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
              {reservations
                ? reservations.map((reservation) => {
                    return (
                      <TableRow key={reservation.id}>
                        <TableCell>{reservation.plannedDateFrom}</TableCell>
                        <TableCell>{reservation.plannedDateTo}</TableCell>
                        <TableCell>{reservation.user_id}</TableCell>
                        <TableCell>{reservation.bike_id}</TableCell>
                      </TableRow>
                    );
                  })
                : 'Nothing to display'}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};
