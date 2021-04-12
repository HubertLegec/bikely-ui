import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import DateFnsAdapter from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import CircularProgress from '@material-ui/core/CircularProgress';

import { BikelyApi } from '../../api/BikelyApi';

import { Filters } from './Filters';
import { BikeTable } from './BikeTable';

export const Reservations = () => {
  const [bikes, setBikes] = useState([]);

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

  useEffect(() => {
    BikelyApi.getBikes(formValues.startDate).then((bikes) => {
      setBikes(bikes);
    });
    setIsLoading(false);
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
    setFormValues((prev) => ({ ...prev, selectedBikes: bikeIds }));
  };

  const handleCreateReservationRequest = () => {
    const reservations = [];
    formValues.selectedBikes.forEach((bikeId) => {
      const reservation = {
        bike_id: bikeId,
        plannedDateFrom: formValues.startDate,
        plannedDateTo: formValues.endDate,
        rentalPointFrom_id: bikes.find((bike) => bike.bikeId === bikeId).rentalPoint.id,
        rentalPointTo_id: formValues.rentTo,
      };
      reservations.push(reservation);
      console.log(reservations);
    });
    reservations.forEach((res) => BikelyApi.postReservation(res));
  };

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={3}>
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
        </Grid>
        <Grid item xs={9}>
          <BikeTable bikes={filterTable(bikes)} onBikeSelection={handleBikeSelection} />
        </Grid>
      </Grid>
    </Container>
  );
};

// export default Reservations;
