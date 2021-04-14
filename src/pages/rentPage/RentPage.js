import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Alert } from '@material-ui/core';
import DateFnsAdapter from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

import { BikelyApi } from '../../api/BikelyApi';
import { RentTable } from '../../components/rent/RentTable';
import { RentFilters } from '../../components/rent/RentFilters';

import { convertToReservationRecords, generatePicklistData } from './RentPage.service';

export const RentPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [alert, setAlert] = React.useState({ severity: '', message: '' });
  const [reservationRecords, setReservationRecords] = useState([]);
  const [selectedReservations, setSelectedReservations] = useState([]);
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
      rentFromLocationId: filterValues.rentFromLocation,
      userEmail: filterValues.userEmail,
      parsedReservationDate: filterValues.plannedDateFrom
        ? Date.parse(filterValues.plannedDateFrom.toString().substring(0, 15))
        : '',
    };

    return reservationRecords.filter((record) => {
      for (let key in filter) {
        if (record[key] !== filter[key] && filter[key] !== '') {
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
  const handleEmailChange = (newValue) => {
    if (!newValue) {
      newValue = '';
    }
    setFilterValues((prev) => ({ ...prev, userEmail: newValue }));
  };
  const handleReservationSelection = (reservationIds) => {
    setSelectedReservations(reservationIds);
  };

  const handleConfirmRent = (event) => {
    event.preventDefault();
    if (selectedReservations.length !== 0) {
      selectedReservations.forEach((id) => {
        BikelyApi.confirmRent(id).then(
          setReservationRecords(
            reservationRecords.filter((record) => {
              return record.id !== id;
            }),
          ),
        );
      });

      setSelectedReservations([]);
      setAlert({ severity: 'success', message: 'Rents confirmed' });
      setSnackbarOpen(true);
    } else {
      setAlert({ severity: 'error', message: 'Select reservation' });
      setSnackbarOpen(true);
    }
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="right" />;
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return isLoading ? (
    <LinearProgress color="secondary" />
  ) : (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h4" pt={5}>
        Current reservations
      </Typography>
      <Grid container spacing={4} pt={5}>
        <Grid item xs={3}>
          <Paper>
            <LocalizationProvider dateAdapter={DateFnsAdapter}>
              <RentFilters
                picklistData={generatePicklistData(rentalPoints, reservationRecords)}
                filterValues={filterValues}
                onPickupLocationChange={handlePickupLocationChange}
                onStartDateChange={handleStartDateChange}
                onEmailChange={handleEmailChange}
                handleConfirmRent={handleConfirmRent}
              />
            </LocalizationProvider>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <RentTable
            reservationRecords={filterTable(reservationRecords)}
            onReservationSelection={handleReservationSelection}
          />
        </Grid>
      </Grid>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        TransitionComponent={TransitionLeft}
      >
        <Alert onClose={handleSnackbarClose} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};
