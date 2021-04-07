import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DatePicker from "@material-ui/lab/DatePicker";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Box, Button, FormControlLabel, Switch } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    minWidth: 120,
    display: "flex",
    flexDirection: "Column",
  },
});

const Filters = ({
  bikes,
  bikeType,
  onBikeTypeChange,
  isElectric,
  onIsElectricSwitchChange,
  frameSize,
  onFrameSizeChange,
  rentFrom,
  onPickupLocationChange,
}) => {
  const bikeTypes = new Set(
    bikes.map((e) => {
      return e.type;
    })
  );
  const frameSizes = new Set(
    bikes.map((e) => {
      return e.frameSize;
    })
  );
  const rentalPointLocations = new Set(
    bikes.map((e) => {
      return e.rentalPoint.location;
    })
  );

  const classes = useStyles();
  // const [bikeType, setBikeType] = useState("");
  // const [isElectric, setIsElectric] = useState(false);
  // const [frameSize, setframeSize] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // const [rentFrom, setRentFrom] = useState("");
  const [rentTo, setRentTo] = useState("");

  // const handleIsElectricSwitchChange = (event) => {
  //   setIsElectric(event.target.checked);
  //   console.log(event.target.checked)
  // };

  // const handleFrameSizeChange = (event) => {
  //   setframeSize(event.target.value);
  // };
  // const handlePickupLocationChange = (event) => {
  //   setRentFrom(event.target.value);
  // };
  const handleReturnLocationChange = (event) => {
    setRentTo(event.target.value);
  };
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

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

  function setRentalPointLocationPickListElement(type) {
    return <MenuItem value={type}>{type}</MenuItem>;
  }

  Filters.propTypes = {
    bikes: PropTypes.any,
    bikeType: PropTypes.string,
    onBikeTypeChange: PropTypes.any,
    isElectric: PropTypes.any,
    onIsElectricSwitchChange: PropTypes.any,
    frameSize: PropTypes.any,
    onFrameSizeChange: PropTypes.any,
    rentFrom: PropTypes.any,
    onPickupLocationChange: PropTypes.any,
  }

  return (
    <Box className={classes.root}>
      <FormControl>
        <InputLabel id="bike-type-select">Bike Type</InputLabel>
        <Select
          labelId="bike-type-select"
          id="bike-type-select"
          value={bikeType}
          onChange={onBikeTypeChange}
        >
          {[...bikeTypes].map((type) => setBikeTypePickListElement(type))}
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Switch
            checked={isElectric}
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
          value={frameSize}
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
          value={rentFrom}
          onChange={onPickupLocationChange}
        >
          {[...rentalPointLocations].map((location) =>
            setRentalPointLocationPickListElement(location)
          )}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="rent-to-select">Return Location</InputLabel>
        <Select
          labelId="rent-to-select"
          id="rent-to-select"
          value={rentTo}
          onChange={handleReturnLocationChange}
        >
          {[...rentalPointLocations].map((location) =>
            setRentalPointLocationPickListElement(location)
          )}
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Reservation start date"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="Reservation end date"
          value={endDate}
          onChange={handleEndDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Button variant="contained" color="primary">
        Create Reservation
      </Button>
    </Box>
  );
};

export default Filters;
