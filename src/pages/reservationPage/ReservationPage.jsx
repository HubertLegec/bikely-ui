import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import DateFnsAdapter from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

import { BikelyApi } from '../../api/BikelyApi';

import { Filters } from './filters/Filters';
import { BikeTable } from './bikeTable/BikeTable';

export const ReservationPage = () => {
  const [bikes, setBikes] = useState([]);
  const [selectedBikes, setSelectedBikes] = useState([]);

  const [formValues, setFormValues] = useState({
    selectedBikes: [],
    selectedBikeType: '',
    isElectric: '',
    selectedFrameSize: '',
    rentFrom: '',
    rentTo: '',
    startDate: null,
    endDate: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [alert, setAlert] = React.useState({ severity: '', message: '' });

  useEffect(() => {
    (async function () {
      try {
        const bikes = await BikelyApi.getBikes(formValues.startDate);
        setBikes(bikes);
      } catch (error) {
        console.log('error:', error);
      }
      setIsLoading(false);
    })();
  }, [formValues.startDate]);

  const filterTable = (bikes) => {
    const filter = {
      type: formValues.selectedBikeType,
      isElectric: formValues.isElectric,
      frameSize: formValues.selectedFrameSize,
      location: formValues.rentFrom,
    };

    return bikes.filter((bike) => {
      bike.location = bike.rentalPoint.id;
      for (let key in filter) {
        if (bike[key] !== filter[key] && filter[key] !== '') {
          return false;
        }
      }

      return true;
    });
  };

  const handleBikeTypeChange = (event) => {
    setFormValues((prev) => ({
      ...prev,
      selectedBikeType: event.target.value,
    }));
  };

  const handleIsElectricSwitchChange = (event) => {
    setFormValues((prev) => ({ ...prev, isElectric: event.target.checked }));
  };

  const handleFrameSizeChange = (event) => {
    setFormValues((prev) => ({
      ...prev,
      selectedFrameSize: event.target.value,
    }));
  };

  const handlePickupLocationChange = (event) => {
    setFormValues((prev) => ({ ...prev, rentFrom: event.target.value }));
  };

  const handleReturnLocationChange = (event) => {
    setFormValues((prev) => ({ ...prev, rentTo: event.target.value }));
  };

  const handleStartDateChange = (date) => {
    setFormValues((prev) => ({ ...prev, startDate: date }));
  };

  const handleEndDateChange = (date) => {
    setFormValues((prev) => ({ ...prev, endDate: date }));
  };

  const handleBikeSelection = (bikeIds) => {
    setSelectedBikes(bikeIds);
  };

  const handleCreateReservationRequest = () => {
    const reservations = [];
    if (selectedBikes.length > 0) {
      selectedBikes.forEach((bikeId) => {
        const reservation = {
          bike_id: bikeId,
          plannedDateFrom: formValues.startDate,
          plannedDateTo: formValues.endDate,
          rentalPointFrom_id: bikes.find((bike) => bike.bikeId === bikeId).rentalPoint.id,
          rentalPointTo_id: formValues.rentTo,
        };
        reservations.push(reservation);
      });
      reservations.forEach((res) => BikelyApi.postReservation(res));
      setSelectedBikes([]);
      setAlert({ severity: 'success', message: 'Reservation created' });
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
        Available bikes
      </Typography>

      <Grid container spacing={4} pt={5}>
        <Grid item xs={3}>
          <Paper>
            <LocalizationProvider dateAdapter={DateFnsAdapter}>
              <Filters
                bikes={bikes}
                formValues={formValues}
                onBikeTypeChange={handleBikeTypeChange}
                onIsElectricSwitchChange={handleIsElectricSwitchChange}
                onFrameSizeChange={handleFrameSizeChange}
                onPickupLocationChange={handlePickupLocationChange}
                onReturnLocationChange={handleReturnLocationChange}
                onStartDateChange={handleStartDateChange}
                onEndDateChange={handleEndDateChange}
                createReservationRequest={handleCreateReservationRequest}
              />
            </LocalizationProvider>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <BikeTable bikes={filterTable(bikes)} onBikeSelection={handleBikeSelection} />
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
