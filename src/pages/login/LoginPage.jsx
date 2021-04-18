import React, { useState } from 'react';
import { Paper, useTheme } from '@material-ui/core';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

import { LoginForm } from '../../components/forms';
import { validateEmail, validatePassword } from '../../helpers/validation';
import { BikelyApi } from '../../api/BikelyApi';
import { userState } from '../../states/user';
import { LoginRegisterFormWrapper } from '../../components/loginRegisterFormWrapper/LoginRegisterFormWrapper';

import { useStyles } from './Login.styles';

const initialValues = { email: '', password: '' };

export const LoginPage = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const history = useHistory();

  const [inputValues, setInputValues] = useState(initialValues);
  const [inputErrors, setInputErrors] = useState(initialValues);
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

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
    if (!loading) setLoading(() => true);
    const result = await BikelyApi.login(values);
    if (result.error) {
      if (result.statusCode === 401) {
        setFormError('Invalid credentials');
      } else {
        setFormError('Something went wrong');
      }
      setSubmitting(false);
    } else if (userState.isAuthenticated()) {
      history.push('/');
    }
    setLoading(() => false);
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
  });

  return (
    <div className={classes.container}>
      <LoginRegisterFormWrapper>
        <Paper className={classes.paper}>
          <LoginForm formik={formik} formError={formError} loading={loading} />
        </Paper>
      </LoginRegisterFormWrapper>
    </div>
  );
};
