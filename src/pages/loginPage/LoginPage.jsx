import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

import { LoginForm } from '../../components/forms';
import { validateEmail, validatePassword } from '../../helpers/validation';
import { BikelyApi } from '../../api/BikelyApi';

import { useStyles } from './LoginPage.styles';

export const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const [inputValues, setInputValues] = useState({ email: '', password: '' });
  const [inputErrors, setInputErrors] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState('');

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
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <LoginForm formik={formik} formError={formError} />
      </Paper>
    </div>
  );
};
