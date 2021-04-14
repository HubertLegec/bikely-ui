import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Autocomplete, Box, Button, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    minWidth: 120,
    padding: 10,
    height: '100%',
    display: 'flex',
    flexDirection: 'Column',
  },
});

export const ReturnFilters = ({
  picklistData,
  filterValues,
  onReturnLocationChange,
  onBikeNumberChange,
  handleConfirmReturn,
}) => {
  const classes = useStyles();

  function setRentalPointLocationPickListElement(rentalPoint) {
    return <MenuItem value={rentalPoint.id}>{rentalPoint.location}</MenuItem>;
  }

  ReturnFilters.propTypes = {
    picklistData: PropTypes.object,
    filterValues: PropTypes.object,
    onReturnLocationChange: PropTypes.func,
    onBikeNumberChange: PropTypes.func,
    handleConfirmReturn: PropTypes.func,
  };

  const defaultProps = {
    options: [...picklistData.userEmails],
    getOptionLabel: (option) => option,
  };

  return (
    <Box className={classes.root}>
      <FormControl>
        <InputLabel id="return-to-select">Return location</InputLabel>
        <Select
          labelId="return-to-select"
          id="return-to-select"
          value={filterValues.rentTo}
          onChange={onReturnLocationChange}
        >
          {picklistData.points.map((point) => setRentalPointLocationPickListElement(point))}
        </Select>
      </FormControl>
      <Autocomplete
        {...defaultProps}
        autoComplete
        autoHighlight
        id="bike-number"
        onChange={(event, newValue) => {
          onBikeNumberChange(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="bike number" margin="normal" variant="standard" />}
      />

      <Button variant="contained" color="primary" onClick={handleConfirmReturn}>
        Return bike
      </Button>
    </Box>
  );
};
