import React from 'react';
import { FormGroup, Button, Typography, Box, CircularProgress, useTheme } from '@material-ui/core';
import PropTypes from 'prop-types';

import { EmailInput, PasswordInput } from '../inputs';

import { useStyles } from './LoginForm.styles';

export const LoginForm = ({ formik, formError, loading }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const { handleSubmit, errors, values, isSubmitting, handleChange } = formik;
  const { password, email } = values;

  return (
    <form className="login" onSubmit={handleSubmit}>
      <Typography variant="h5" className={classes.header}>
        Login
      </Typography>
      <Box mb={2} />
      <FormGroup className={classes.loginForm}>
        <EmailInput errors={errors.email} id="email" name="email" value={email} onChange={handleChange} />
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
            Login
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </FormGroup>
    </form>
  );
};

LoginForm.propTypes = {
  formik: PropTypes.object,
  formError: PropTypes.string,
  loading: PropTypes.bool,
};
