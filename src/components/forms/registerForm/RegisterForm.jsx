import React, { useState } from 'react';
import { useFormik } from 'formik';
import { FormGroup, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';

import { EmailInput, PasswordInput, UsernameInput } from '../inputs';
// import { validateEmail, validatePassword, validateUsername } from '../../../helpers/validation';
import styles from '../form.module.css'; //czy to potrzebne?
// import { BikelyApi } from '../../../api/BikelyApi';

import { useStyles } from './RegisterForm.styles';

export const RegisterForm = ({ formik, formError }) => {
  const [/*formError,*/ setFormError] = useState('');
  const classes = useStyles();
  // const [inputValues, setInputValues] = useState({ email: '', password: '', username: '' });
  // const [inputErrors, setInputErrors] = useState({ email: '', password: '', username: '' });
  // const history = useHistory();

  const { handleSubmit, errors, values, handleChange, isSubmitting } = formik;
  const { password, email, username } = values; //czy username tutaj?

  // const validate = (values) => {
  //   const errors = inputErrors;
  //   let isAllValid = true;

  //   if (inputValues.email !== values.email) {
  //     errors.email = validateEmail(values.email);
  //   } else if (inputValues.password !== values.password) {
  //     errors.password = validatePassword(values.password);
  //   } else if (inputValues.username !== values.username) {
  //     errors.username = validateUsername(values.username);
  //   } else {
  //     errors.email = validateEmail(values.email);
  //     errors.password = validatePassword(values.password);
  //     errors.username = validateUsername(values.username);
  //   }

  //   setInputErrors(errors);
  //   setInputValues(values);
  //   for (const error in errors) {
  //     if (errors[error].length !== 0) isAllValid = false;
  //   }

  //   return isAllValid ? null : errors;
  // };

  // const onSubmit = async (values, { setSubmitting }) => {
  //   setFormError('');
  //   const registerResponse = await BikelyApi.register(values);
  //   if (!registerResponse.error) {
  //     const loginResponse = await BikelyApi.login(values);
  //     if (loginResponse.error) {
  //       setFormError('Something went wrong');

  //       setSubmitting(false);
  //     } else if (BikelyApi.userHasAuthenticated()) history.push('/');
  //   } else {
  //     if (registerResponse.statusCode === 400 && Array.isArray(registerResponse.message))
  //       setFormError(registerResponse.message[0]);
  //     setFormError('Something went wrong');
  //   }
  //   setFormError('Something went wrong');

  //   setSubmitting(false);
  // };

  // const formik = useFormik({
  //   initialValues: { email: '', password: '', username: '' },
  //   validate,
  //   onSubmit,
  // });

  return (
    <form className="register" onSubmit={handleSubmit}>
      <FormGroup className={styles.loginForm}>
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
        <div id="formError" className={styles.formError}>
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

///////kopia jako punkt odniesienia
// return (
//   <form className="register" onSubmit={formik.handleSubmit}>
//     <FormGroup className={styles.loginForm}>
//       <EmailInput
//         errors={formik.errors.email}
//         id="email"
//         name="email"
//         value={formik.values.email}
//         onChange={formik.handleChange}
//       />
//       <UsernameInput
//         errors={formik.errors.username}
//         id="username"
//         name="username"
//         value={formik.values.username}
//         onChange={formik.handleChange}
//       />
//       <PasswordInput
//         errors={formik.errors.password}
//         id="password"
//         name="password"
//         value={formik.values.password}
//         onChange={formik.handleChange}
//       />
//       <div id="formError" className={styles.formError}>
//         {formError}
//       </div>
//       <Button type="submit" className={styles.submitButton} disabled={formik.isSubmitting}>
//         Submit
//       </Button>
//     </FormGroup>
//   </form>
// );
