import { useFormik } from "formik";
import { useState } from "react";
import { EmailInput } from "./inputs/email";
import { PasswordInput } from "./inputs/password";
import { FormGroup, Button } from "@material-ui/core";
import styles from "./login.module.css";

export function LoginPanel(props) {
  const [inputValues, setInputValues] = useState({ email: "", password: "" });
  const [inputErrors, setInputErrors] = useState({ email: "", password: "" });
  const validate = values => {
    const errors = inputErrors;

    if (inputValues.email !== values.email) {
      setInputErrors({ email: "", password: inputErrors.password });
      if (!values.email) {
        errors.email = "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      } else errors.email = "";
    } else if (inputValues.password !== values.password) {
      setInputErrors({ email: inputErrors.email, password: "" });
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 8) {
        errors.password = "Password too short";
      } else errors.password = "";
    }

    setInputErrors(errors);
    setInputValues(values);
    return errors;
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
