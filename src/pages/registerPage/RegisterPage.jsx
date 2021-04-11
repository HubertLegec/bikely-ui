import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

import { RegisterForm } from '../../components/forms';
import { validateEmail, validatePassword, validateUsername } from '../../helpers/validation';
import { BikelyApi } from '../../api/BikelyApi';

import { useStyles } from './RegisterPage.styles';

export const RegisterPage = () => {
  const classes = useStyles();
  const [inputValues, setInputValues] = useState({ email: '', password: '', username: '' });
  const [inputErrors, setInputErrors] = useState({ email: '', password: '', username: '' });
  const [formError, setFormError] = useState('');
  const history = useHistory();

  const validate = (values) => {
    const errors = inputErrors;
    let isAllValid = true;

    if (inputValues.email !== values.email) {
      errors.email = validateEmail(values.email);
    } else if (inputValues.password !== values.password) {
      errors.password = validatePassword(values.password);
    } else if (inputValues.username !== values.username) {
      errors.username = validateUsername(values.username);
    } else {
      errors.email = validateEmail(values.email);
      errors.password = validatePassword(values.password);
      errors.username = validateUsername(values.username);
    }

    setInputErrors(errors);
    setInputValues(values);
    for (const error in errors) {
      if (errors[error].length !== 0) isAllValid = false;
    }

    return isAllValid ? null : errors;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setFormError('');
    const registerResponse = await BikelyApi.register(values);
    if (!registerResponse.error) {
      const loginResponse = await BikelyApi.login(values);
      if (loginResponse.error) {
        setFormError('Something went wrong');

        setSubmitting(false);
      } else if (BikelyApi.userHasAuthenticated()) history.push('/');
    } else {
      if (registerResponse.statusCode === 400 && Array.isArray(registerResponse.message))
        setFormError(registerResponse.message[0]);
      setFormError('Something went wrong');
    }
    setFormError('Something went wrong');

    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: { email: '', password: '', username: '' },
    validate,
    onSubmit,
  });

  return (
    // <Grid alignItems="center" justify="center" style={{ minHeight: '100vh' }} container spacing={0}>
    //   <Grid item xs={4}>
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <RegisterForm formik={formik} formError={formError} />
      </Paper>
    </div>
    //   </Grid>
    // </Grid>
  );
};
