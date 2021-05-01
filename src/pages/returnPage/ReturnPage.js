import React, { useState, useEffect, useContext } from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import DateFnsAdapter from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

import { BikelyApi } from '../../api/BikelyApi';
import { ReturnTable } from '../../components/return/ReturnTable';
import { ReturnFilters } from '../../components/return/ReturnFilters';
import { StoreContext } from '../../states/Store';

import { convertToRentRecords, generatePicklistData } from './ReturnPage.service';

export const ReturnPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [alert, setAlert] = React.useState({ severity: '', message: '' });
  const [rentRecords, setRentRecords] = useState([]);
  const [selectedRents, setSelectedRents] = useState([]);
  const [rentalPoints, setRentalPoints] = useState([]);
  const [filterValues, setFilterValues] = useState({
    rentToLocation: '',
    bikeNumber: '',
  });
  const { accessToken } = useContext(StoreContext);

  useEffect(() => {
    BikelyApi.getRentalPoints(accessToken).then((rentalPoints) => {
      setRentalPoints(rentalPoints);
    });
  }, [accessToken]);

  useEffect(() => {
    if (rentalPoints.length) {
      BikelyApi.getPresentRents(accessToken)
        .then((presentRents) => {
          setRentRecords(convertToRentRecords(presentRents, rentalPoints));
        })
        .then(setIsLoading(false));
    }
  }, [rentalPoints, accessToken]);

  const filterTable = (reservationRecords) => {
    const filter = {
      bikeId: filterValues.bikeNumber,
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

  const handleReturnLocationChange = (event) => {
    setFilterValues((prev) => ({ ...prev, rentToLocation: event.target.value }));
  };

  const handleBikeNumberChange = (newValue) => {
    if (!newValue) {
      newValue = '';
    }
    setFilterValues((prev) => ({ ...prev, bikeNumber: newValue }));
  };
  const handleReservationSelection = (rentIds) => {
    setSelectedRents(rentIds);
  };

  const handleConfirmReturn = () => {
    if (selectedRents.length) {
      selectedRents.forEach((id) => {
        BikelyApi.returnBike(filterValues.rentToLocation, id, accessToken).then(
          setRentRecords(
            rentRecords.filter((record) => {
              return record.id !== id;
            }),
          ),
        );
      });

      setSelectedRents([]);
      setAlert({ severity: 'success', message: 'Bike returned' });
      setSnackbarOpen(true);
    } else {
      setAlert({ severity: 'error', message: 'Select bike' });
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
        Rented bikes
      </Typography>
      <Grid container spacing={4} pt={5}>
        <Grid item xs={3}>
          <Paper>
            <LocalizationProvider dateAdapter={DateFnsAdapter}>
              <ReturnFilters
                picklistData={generatePicklistData(rentalPoints, rentRecords)}
                filterValues={filterValues}
                onReturnLocationChange={handleReturnLocationChange}
                onBikeNumberChange={handleBikeNumberChange}
                handleConfirmReturn={handleConfirmReturn}
              />
            </LocalizationProvider>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <ReturnTable
            reservationRecords={filterTable(rentRecords)}
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
