import { useFormik } from "formik";
import { useState } from "react";
import { FormGroup, Button } from "@material-ui/core";
import { EmailInput } from "./inputs/email";
import { PasswordInput } from "./inputs/password";
import { UsernameInput } from "./inputs/username";
import { validateEmail, validatePassword, validateUsername } from "./validation";
import styles from "./form.module.css";

export function RegisterForm(props) {
  const [inputValues, setInputValues] = useState({ email: "", password: "", username: "" });
  const [inputErrors, setInputErrors] = useState({ email: "", password: "", username: "" });

  const validate = values => {
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

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));

      setSubmitting(false);
    }, 400);
  };

  const formik = useFormik({
    initialValues: { email: "", password: "", username: "" },
    validate,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroup className={styles.loginForm}>
        <EmailInput errors={formik.errors.email} id="email" name="email" label="Email" value={formik.values.email} onChange={formik.handleChange}></EmailInput>
        <PasswordInput
          errors={formik.errors.password}
          id="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
        ></PasswordInput>
        <UsernameInput
          errors={formik.errors.username}
          id="username"
          name="username"
          label="Username"
          value={formik.values.email}
          onChange={formik.handleChange}
        ></UsernameInput>
        <Button type="submit" className={styles.submitButton} disabled={formik.isSubmitting}>
          Submit
        </Button>
      </FormGroup>
    </form>
  );
}
