import React from 'react';
import { FormGroup, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import { EmailInput, PasswordInput } from '../inputs';

import { useStyles } from './LoginForm.styles';

export const LoginForm = ({ formik, formError }) => {
  const classes = useStyles();

  const { handleSubmit, errors, values, handleChange, isSubmitting } = formik;
  const { password, email } = values;

  return (
    <form className="login" onSubmit={handleSubmit}>
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
        <Button
          variant="outlined"
          color="primary"
          className={classes.submitButton}
          type="submit"
          disabled={isSubmitting}
        >
          Login
        </Button>
      </FormGroup>
    </form>
  );
};

LoginForm.propTypes = {
  formik: PropTypes.object,
  formError: PropTypes.string,
};
