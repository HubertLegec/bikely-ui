import React from "react";
import { FormHelperText, FormControl, InputLabel, Input } from "@material-ui/core";
import styles from "./input.module.css";
import PropTypes from "prop-types";

export function PasswordInput({ id, errors, name, onChange }) {
  return (
    <FormControl>
      <InputLabel htmlFor={id}>Password</InputLabel>
      <Input type="password" error={errors ? true : false} id={id} name={name} onChange={e => onChange(e)} aria-describedby="password-input-field" />
      <FormHelperText className={styles.FormHelperText}>{errors ? errors : ""}</FormHelperText>
    </FormControl>
  );
}

PasswordInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
