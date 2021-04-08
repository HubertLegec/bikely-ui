import React from 'react';
import PropTypes from 'prop-types';
import { FormHelperText, FormControl, InputLabel, Input } from '@material-ui/core';

import styles from '../input.module.css';

export const EmailInput = ({ id, name, errors, onChange }) => {
  return (
    <FormControl>
      <InputLabel htmlFor={id}>Email</InputLabel>
      <Input
        type="email"
        error={!!errors}
        id={id}
        name={name}
        onChange={(e) => onChange(e)}
        aria-describedby="email-input-field"
      />
      <FormHelperText className={styles.FormHelperText}>{errors ? errors : ''}</FormHelperText>
    </FormControl>
  );
};

EmailInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
