import { useFormik } from "formik";
import { useState } from "react";
import { EmailInput } from "./inputs/email";
import { PasswordInput } from "./inputs/password";
import { FormGroup, Button } from "@material-ui/core";
import { validateEmail, validatePassword } from "./validation";
import styles from "./form.module.css";

export function LoginForm(props) {
  const [inputValues, setInputValues] = useState({ email: "", password: "" });
  const [inputErrors, setInputErrors] = useState({ email: "", password: "" });
  const validate = values => {
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

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));

      setSubmitting(false);
    }, 400);
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
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

        <Button className={styles.submitButton} type="submit" disabled={formik.isSubmitting}>
          Submit
        </Button>
      </FormGroup>
    </form>
  );
}
