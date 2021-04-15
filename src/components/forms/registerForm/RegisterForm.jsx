import React from 'react';
import { FormGroup, Button, Typography, Box, CircularProgress, useTheme } from '@material-ui/core';
import PropTypes from 'prop-types';

import { EmailInput, PasswordInput, UsernameInput } from '../inputs';

import { useStyles } from './RegisterForm.styles';

export const RegisterForm = ({ formik, formError, loading }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const { handleSubmit, errors, values, handleChange, isSubmitting } = formik;
  const { password, email, username } = values;

  return (
    <form className="register" onSubmit={handleSubmit}>
      <Typography variant="h5" className={classes.header}>
        Register
      </Typography>
      <Box mb={2} />
      <FormGroup className={classes.loginForm}>
        <EmailInput errors={errors.email} id="email" name="email" value={email} onChange={handleChange} />
        <UsernameInput
          errors={errors.username}
          id="username"
          name="username"
          value={username}
          onChange={handleChange}
        />
        <PasswordInput
          errors={errors.password}
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <div id="formError" className={classes.formError}>
          {formError}
        </div>
        <div className={classes.submitButton}>
          <Button variant="outlined" color="primary" type="submit" disabled={isSubmitting}>
            Register
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </FormGroup>
    </form>
  );
};

RegisterForm.propTypes = {
  formik: PropTypes.object,
  formError: PropTypes.string,
  loading: PropTypes.bool,
};
