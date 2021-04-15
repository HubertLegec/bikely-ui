import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Autocomplete, Box, Button, TextField } from '@material-ui/core';
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

export const RentFilters = ({
  picklistData,
  filterValues,
  onPickupLocationChange,
  onEmailChange,
  onStartDateChange,
  handleConfirmRent,
}) => {
  const classes = useStyles();

  function setRentalPointLocationPickListElement(rentalPoint) {
    return <MenuItem value={rentalPoint.id}>{rentalPoint.location}</MenuItem>;
  }

  RentFilters.propTypes = {
    picklistData: PropTypes.object,
    filterValues: PropTypes.object,
    onPickupLocationChange: PropTypes.func,
    onEmailChange: PropTypes.func,
    onStartDateChange: PropTypes.func,
    handleConfirmRent: PropTypes.func,
  };

  const defaultProps = {
    options: [...picklistData.userEmails],
    getOptionLabel: (option) => option,
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
      <Autocomplete
        {...defaultProps}
        autoComplete
        autoHighlight
        id="customer-email-select"
        onChange={(event, newValue) => {
          onEmailChange(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Customer email" margin="normal" variant="standard" />}
      />
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
      <Button variant="contained" color="primary" onClick={handleConfirmRent}>
        Confirm rent
      </Button>
    </Box>
  );
};
