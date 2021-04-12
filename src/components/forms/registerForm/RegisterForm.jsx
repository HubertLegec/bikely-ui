import React from 'react';
import { FormGroup, Button, useTheme } from '@material-ui/core';
import PropTypes from 'prop-types';

import { EmailInput, PasswordInput, UsernameInput } from '../inputs';

import { useStyles } from './RegisterForm.styles';

export const RegisterForm = ({ formik, formError }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const { handleSubmit, errors, values, handleChange, isSubmitting } = formik;
  const { password, email, username } = values;

  return (
    <form className="register" onSubmit={handleSubmit}>
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
        <Button
          variant="outlined"
          color="primary"
          className={classes.submitButton}
          type="submit"
          disabled={isSubmitting}
        >
          Register
        </Button>
      </FormGroup>
    </form>
  );
};

RegisterForm.propTypes = {
  formik: PropTypes.object,
  formError: PropTypes.string,
};
