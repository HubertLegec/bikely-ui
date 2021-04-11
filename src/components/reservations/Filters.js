import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  Box,
  Button,
  FormControlLabel,
  FormHelperText,
  Switch,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles({
  root: {
    minWidth: 120,
    display: "flex",
    flexDirection: "Column",
  },
});

const Filters = ({
  bikes,
  formValues,
  onBikeTypeChange,
  onIsElectricSwitchChange,
  onFrameSizeChange,
  onPickupLocationChange,
  onReturnLocationChange,
  onStartDateChange,
  onEndDateChange,
  createReservationRequest,
}) => {
  const bikeTypes = new Set(
    bikes.map((e) => {
      return e.type;
    })
  ).add("");
  const frameSizes = new Set(
    bikes.map((e) => {
      return e.frameSize;
    })
  ).add("");
  const rentalPoints = new Set(
    bikes
      .map((e) => {
        return e.rentalPoint;
      })
      .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
  ).add({ id: "", location: "" });

  const classes = useStyles();
  const [inputErrors, setInputErrors] = useState({
    rentTo: false,
    startDate: false,
    endDate: false,
    selectedBikes: false,
  });

  function setFrameSizePickListElement(frameSize) {
    return <MenuItem value={frameSize}>{frameSize}</MenuItem>;
  }
  function setBikeTypePickListElement(type) {
    return (
      <MenuItem value={type}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </MenuItem>
    );
  }

  function setRentalPointLocationPickListElement(rentalPoint) {
    return <MenuItem value={rentalPoint.id}>{rentalPoint.location}</MenuItem>;
  }

  Filters.propTypes = {
    bikes: PropTypes.any,
    formValues: PropTypes.object,
    onBikeTypeChange: PropTypes.func,
    onIsElectricSwitchChange: PropTypes.func,
    onFrameSizeChange: PropTypes.func,
    onPickupLocationChange: PropTypes.func,
    onReturnLocationChange: PropTypes.func,
    onStartDateChange: PropTypes.func,
    onEndDateChange: PropTypes.func,
    createReservationRequest: PropTypes.func,
  };

  const handleClick = () => {
    if (validateForm()) {
      createReservationRequest();
    }
  };

  const validateForm = () => {
    const errors = { ...inputErrors };
    let allValid = true;

    !formValues.rentTo ? (errors.rentTo = true) : (errors.rentTo = false);
    !formValues.startDate
      ? (errors.startDate = true)
      : (errors.startDate = false);
    !formValues.endDate ? (errors.endDate = true) : (errors.endDate = false);
    !formValues.selectedBikes.length
      ? (errors.selectedBikes = true)
      : (errors.selectedBikes = false);

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
        <InputLabel id="bike-type-select">Bike Type</InputLabel>
        <Select
          labelId="bike-type-select"
          id="bike-type-select"
          value={formValues.selectedBikeType}
          onChange={onBikeTypeChange}
        >
          {[...bikeTypes].map((type) => setBikeTypePickListElement(type))}
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Switch
            checked={formValues.isElectric}
            onChange={onIsElectricSwitchChange}
            name="isElectric"
          />
        }
        label="Electric Engine"
      />

      <FormControl>
        <InputLabel id="frame-size-select">Frame Size</InputLabel>
        <Select
          labelId="frame-size-select"
          id="frame-size-select"
          value={formValues.selectedFrameSize}
          onChange={onFrameSizeChange}
        >
          {[...frameSizes].map((size) => setFrameSizePickListElement(size))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="rent-from-select">Pickup location</InputLabel>
        <Select
          labelId="rent-from-select"
          id="rent-from-select"
          value={formValues.rentFrom}
          onChange={onPickupLocationChange}
        >
          {[...rentalPoints].map((point) =>
            setRentalPointLocationPickListElement(point)
          )}
        </Select>
      </FormControl>
      <FormControl required error={inputErrors.rentTo}>
        <InputLabel id="rent-to-select">Return Location</InputLabel>
        <Select
          labelId="rent-to-select"
          id="rent-to-select"
          value={formValues.rentTo}
          onChange={onReturnLocationChange}
        >
          {[...rentalPoints].map((point) =>
            setRentalPointLocationPickListElement(point)
          )}
        </Select>
        {inputErrors.rentTo && (
          <FormHelperText>Select return location</FormHelperText>
        )}
      </FormControl>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormControl required error={inputErrors.startDate}>
          <DateTimePicker
            label="Reservation start date"
            value={formValues.startDate}
            onChange={onStartDateChange}
            disablePast
            showTodayButton
            ampm={false}
            autoOk={true}
            format="dd MMMM yy HH:MM"
            margin="normal"
            inputVariant="standard"
          />
          {inputErrors.startDate && (
            <FormHelperText>Select date</FormHelperText>
          )}
        </FormControl>
        <FormControl required error={inputErrors.endDate}>
          <DateTimePicker
            label="Reservation end date"
            value={formValues.endDate}
            onChange={onEndDateChange}
            disablePast
            minDate={formValues.startDate}
            ampm={false}
            autoOk={true}
            format="dd MMMM yy HH:MM"
            margin="normal"
            inputVariant="standard"
          />
          {inputErrors.endDate && <FormHelperText>Select date</FormHelperText>}
        </FormControl>
      </MuiPickersUtilsProvider>
      <FormControl error={inputErrors.selectedBikes}>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Create Reservation
        </Button>
        {inputErrors.selectedBikes && (
          <FormHelperText>Select bike</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default Filters;
