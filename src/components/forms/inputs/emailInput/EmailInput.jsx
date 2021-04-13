import React from 'react';
import PropTypes from 'prop-types';
import { FormHelperText, FormControl, InputLabel, Input } from '@material-ui/core';

import styles from '../input.module.css';

export const EmailInput = ({ id, name, errors, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={id}>Email</InputLabel>
      <Input
        type="email"
        error={!!errors}
        id={id}
        name={name}
        onChange={onChange}
        aria-describedby="email-input-field"
      />
      <FormHelperText id="FormInputHelperText" className={styles.FormHelperText}>
        {errors ? errors : ''}
      </FormHelperText>
    </FormControl>
  );
};

EmailInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
