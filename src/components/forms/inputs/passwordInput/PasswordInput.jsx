import React from 'react';
import { FormHelperText, FormControl, InputLabel, Input } from '@material-ui/core';
import PropTypes from 'prop-types';

import styles from '../input.module.css';

export const PasswordInput = ({ id, errors, name, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={id}>Password</InputLabel>
      <Input
        type="password"
        error={!!errors}
        id={id}
        name={name}
        onChange={onChange}
        aria-describedby="password-input-field"
      />
      <FormHelperText id="FormInputHelperText" className={styles.FormHelperText}>
        {errors ? errors : ''}
      </FormHelperText>
    </FormControl>
  );
};

PasswordInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
