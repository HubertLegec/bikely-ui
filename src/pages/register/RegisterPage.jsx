import React, { useState } from 'react';
import { Paper, useTheme } from '@material-ui/core';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

import { RegisterForm } from '../../components/forms';
import { validateEmail, validatePassword, validateUsername } from '../../helpers/validation';
import { BikelyApi } from '../../api/BikelyApi';
import { LoginRegisterFormWrapper } from '../../components/loginRegisterFormWrapper/LoginRegisterFormWrapper';
import { userState } from '../../states/user';

import { useStyles } from './RegisterPage.styles';

const initialValues = { email: '', password: '', username: '' };

export const RegisterPage = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const history = useHistory();

  const [inputValues, setInputValues] = useState(initialValues);
  const [inputErrors, setInputErrors] = useState(initialValues);
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = React.useState(false);

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
    if (!loading) setLoading(() => true);
    const registerResponse = await BikelyApi.register(values);
    if (!registerResponse.error) {
      const loginResponse = await BikelyApi.login(values);
      if (loginResponse.error) {
        setFormError('Something went wrong');
        setSubmitting(false);
      } else if (userState.isAuthenticated()) history.push('/login');
    } else {
      if (registerResponse.statusCode === 400 && Array.isArray(registerResponse.message))
        setFormError(registerResponse.message[0]);
      setFormError('Something went wrong');
    }
    setFormError('Something went wrong');
    setSubmitting(false);
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
          <RegisterForm formik={formik} formError={formError} loading={loading} />
        </Paper>
      </LoginRegisterFormWrapper>
    </div>
  );
};
