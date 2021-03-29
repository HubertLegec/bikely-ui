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

const useStyles = makeStyles({
  root: {
    minWidth: 120,
    display: "flex",
    flexDirection: "Column",
  },
});

const Filters = ({ bikeTypes, frameSizes, rentalPointLocations }) => {
  const classes = useStyles();
  const [bikeType, setBikeType] = useState("");
  const [isElectric, setIsElectric] = useState(false);
  const [frameSize, setframeSize] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rentFrom, setRentFrom] = useState("");
  const [rentTo, setRentTo] = useState("");

  const handleBikeTypeChange = (event) => {
    setBikeType(event.target.value);
  };
  const handleIsElectricSwitchChange = (event) => {
    setIsElectric(event.target.checked);
  };
  const handleFrameSizeChange = (event) => {
    setframeSize(event.target.value);
  };

  function setFrameSizePickListElement(frameSize) {
    return (<MenuItem value={frameSize}>{frameSize}</MenuItem>);
  }
  function setBikeTypePickListElement(type) {
    return (<MenuItem value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</MenuItem>);
  }

  function setRentalPointLocationPickListElement(type) {
    return (<MenuItem value={type}>{type}</MenuItem>);
  }

  return (
    <Box className={classes.root}>
      <FormControl>
        <InputLabel id="bike-type-select">Bike Type</InputLabel>
        <Select
          labelId="bike-type-select"
          id="bike-type-select"
          value={bikeType}
          onChange={handleBikeTypeChange}
        >
          {[...bikeTypes].map((type) => setBikeTypePickListElement(type))}
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Switch
            checked={isElectric}
            onChange={handleIsElectricSwitchChange}
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
          onChange={handleFrameSizeChange}
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
          onChange={(event) => {
            setRentFrom(event.target.value);
          }}
        >
          {[...rentalPointLocations].map((location) => setRentalPointLocationPickListElement(location))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="rent-to-select">Return Location</InputLabel>
        <Select
          labelId="rent-to-select"
          id="rent-to-select"
          value={rentTo}
          onChange={(event) => {
            setRentTo(event.target.value);
          }}
        >
          {[...rentalPointLocations].map((location) => setRentalPointLocationPickListElement(location))}
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Reservation start date"
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="Reservation end date"
          value={endDate}
          onChange={(newValue) => {
            setEndDate(newValue);
          }}
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
