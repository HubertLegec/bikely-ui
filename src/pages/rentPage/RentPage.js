import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import DateFnsAdapter from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import CircularProgress from '@material-ui/core/CircularProgress';

import { BikelyApi } from '../../api/BikelyApi';
import { RentTable } from '../../components/rent/RentTable';
import { RentFilters } from '../../components/rent/RentFilters';

import { convertToReservationRecords, generatePicklistData } from './RentPage.service';
import { useStyles } from './RentPage.styles';

export const RentPage = () => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [reservationRecords, setReservationRecords] = useState([]);
  const [rentalPoints, setRentalPoints] = useState([]);
  const [filterValues, setFilterValues] = useState({
    rentFromLocation: '',
    userEmail: '',
    plannedDateFrom: null,
  });

  useEffect(() => {
    BikelyApi.getRentalPoints().then((rentalPoints) => {
      setRentalPoints(rentalPoints);
    });
  }, []);

  useEffect(() => {
    if (rentalPoints.length) {
      BikelyApi.getReservations()
        .then((reservations) => {
          setReservationRecords(convertToReservationRecords(reservations, rentalPoints));
        })
        .then(setIsLoading(false));
    }
  }, [rentalPoints]);

  const filterTable = (reservationRecords) => {
    const filter = {
      rentFromLocation: filterValues.rentFromLocation,
      userEmail: filterValues.userEmail,
      parsedReservationDate: filterValues.plannedDateFrom
        ? Date.parse(filterValues.plannedDateFrom.toString().substring(0, 15))
        : '',
    };

    console.log('records ' + reservationRecords);
    console.log('filter ' + filter.rentFromLocation);

    return reservationRecords.filter((record) => {
      for (let key in filter) {
        if (record[key] !== filter[key] && filter[key] !== '') {
          console.log(filter[key]);
          console.log(record[key]);

          return false;
        }
      }

      return true;
    });
  };

  const handlePickupLocationChange = (event) => {
    setFilterValues((prev) => ({ ...prev, rentFromLocation: event.target.value }));
  };
  const handleStartDateChange = (date) => {
    setFilterValues((prev) => ({ ...prev, plannedDateFrom: date }));
  };
  //   const handleConfirmRent = (event) => {
  //     setFilterValues((prev) => ({ ...prev, rentFrom: event.target.value }));
  //   };

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Container maxWidth="lg">
      <Grid item xs={3}>
        <Paper>
          <LocalizationProvider dateAdapter={DateFnsAdapter}>
            <RentFilters
              picklistData={generatePicklistData(rentalPoints)}
              filterValues={filterValues}
              onPickupLocationChange={handlePickupLocationChange}
              onStartDateChange={handleStartDateChange}
              //   confirmRent={handleConfirmRent}
            />
          </LocalizationProvider>
        </Paper>
      </Grid>

      <Grid container spacing={4} pt={5}>
        <Grid item xs={3}>
          <Paper></Paper>
        </Grid>
        <Grid item xs={10}>
          <RentTable reservationRecords={filterTable(reservationRecords)} />
        </Grid>
      </Grid>
    </Container>
  );
};
