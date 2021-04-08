import React from 'react';
import { FormHelperText, FormControl, InputLabel, Input } from '@material-ui/core';
import PropTypes from 'prop-types';

import styles from '../input.module.css';

export const UsernameInput = ({ id, name, errors, onChange }) => {
  return (
    <FormControl>
      <InputLabel htmlFor={id}>Username</InputLabel>
      <Input error={!!errors} id={id} name={name} onChange={(e) => onChange(e)} aria-describedby="email-input-field" />
      <FormHelperText className={styles.FormHelperText}>{errors ? errors : ''}</FormHelperText>
    </FormControl>
  );
};

UsernameInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
