import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

export function Search({ setStateFunction, label }) {
  function handleChange(event) {
    setStateFunction(event.target.value);
  }

  return <TextField id="standard-basic" label={label} onChange={handleChange} />;
}

Search.propTypes = {
  setStateFunction: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
