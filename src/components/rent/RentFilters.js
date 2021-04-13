import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Box, Button, FormHelperText } from '@material-ui/core';
import PropTypes from 'prop-types';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles({
  root: {
    minWidth: 120,
    padding: 10,
    height: '100%',
    display: 'flex',
    flexDirection: 'Column',
  },
});

export const RentFilters = ({ picklistData, filterValues, onPickupLocationChange, onStartDateChange, confirmRent }) => {
  const classes = useStyles();
  const [inputErrors, setInputErrors] = useState({
    selectedRecors: false,
  });

  console.log(filterValues.plannedDateFrom);

  function setRentalPointLocationPickListElement(rentalPoint) {
    return <MenuItem value={rentalPoint.id}>{rentalPoint.location}</MenuItem>;
  }

  RentFilters.propTypes = {
    picklistData: PropTypes.object,
    filterValues: PropTypes.object,
    onPickupLocationChange: PropTypes.func,
    onStartDateChange: PropTypes.func,
    confirmRent: PropTypes.func,
  };

  const handleClick = () => {
    if (validateForm()) {
      confirmRent();
    }
  };

  const validateForm = () => {
    const errors = { ...inputErrors };
    let allValid = true;

    !filterValues.rentTo ? (errors.rentTo = true) : (errors.rentTo = false);
    !filterValues.startDate ? (errors.startDate = true) : (errors.startDate = false);
    !filterValues.endDate ? (errors.endDate = true) : (errors.endDate = false);
    !filterValues.selectedBikes.length ? (errors.selectedBikes = true) : (errors.selectedBikes = false);

    setInputErrors({ ...errors });

    Object.values(errors).forEach((error) => {
      if (error) {
        allValid = false;
      }
    });

    return allValid ? true : false;
  };

  return (
    <Box className={classes.root}>
      <FormControl>
        <InputLabel id="rent-from-select">Pickup location</InputLabel>
        <Select
          labelId="rent-from-select"
          id="rent-from-select"
          value={filterValues.rentFrom}
          onChange={onPickupLocationChange}
        >
          {picklistData.points.map((point) => setRentalPointLocationPickListElement(point))}
        </Select>
      </FormControl>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          label="Reservation start date"
          value={filterValues.plannedDateFrom}
          onChange={onStartDateChange}
          showTodayButton
          clearable={true}
          autoOk={true}
          format="dd MMMM yy"
          margin="normal"
          inputVariant="standard"
        />
      </MuiPickersUtilsProvider>
      <FormControl error={inputErrors.selectedRecors}>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Confirm
        </Button>
        {inputErrors.selectedRecors && <FormHelperText>Select bike to continue</FormHelperText>}
      </FormControl>
    </Box>
  );
};
