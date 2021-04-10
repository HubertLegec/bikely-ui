import React, { useState } from 'react';
import { useFormik } from 'formik';
import { FormGroup, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { EmailInput, PasswordInput } from '../inputs';
import { validateEmail, validatePassword } from '../../../helpers/validation';
import { BikelyApi } from '../../../api/BikelyApi';

import { useStyles } from './LoginForm.styles';

export const LoginForm = () => {
  const [inputValues, setInputValues] = useState({ email: '', password: '' });
  const [inputErrors, setInputErrors] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState('');
  const history = useHistory();
  const classes = useStyles();

  const validate = (values) => {
    const errors = inputErrors;
    let isAllValid = true;

    if (inputValues.email !== values.email) {
      errors.email = validateEmail(values.email);
    } else if (inputValues.password !== values.password) {
      errors.password = validatePassword(values.password);
    } else {
      errors.email = validateEmail(values.email);
      errors.password = validatePassword(values.password);
    }

    for (const error in errors) {
      if (errors[error].length !== 0) isAllValid = false;
    }

    setInputErrors(errors);
    setInputValues(values);

    return isAllValid ? null : errors;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setFormError('');
    const result = await BikelyApi.login(values);
    if (result.error) {
      setFormError('Invalid credentials');
      setSubmitting(false);
    } else if (BikelyApi.userHasAuthenticated()) {
      history.push('/');
    }
  };

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validate,
    onSubmit,
  });

  return (
    <form className="login" onSubmit={formik.handleSubmit}>
      <FormGroup className={classes.loginForm}>
        <EmailInput
          errors={formik.errors.email}
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <PasswordInput
          errors={formik.errors.password}
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <div id="formError" className={classes.formError}>
          {formError}
        </div>
        <Button variant="outlined" className={classes.submitButton} type="submit" disabled={formik.isSubmitting}>
          Login
        </Button>
      </FormGroup>
    </form>
  );
};
