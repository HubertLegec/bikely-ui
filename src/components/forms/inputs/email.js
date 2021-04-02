import { FormHelperText, FormControl, InputLabel, Input } from "@material-ui/core";
import styles from "./input.module.css";

export function EmailInput(props) {
  return (
    <FormControl>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <Input
        type="email"
        error={props.errors ? true : false}
        id={props.id}
        name={props.name}
        onChange={e => props.onChange(e)}
        aria-describedby="email-input-field"
      />
      <FormHelperText className={styles.FormHelperText}>{props.errors ? props.errors : ""}</FormHelperText>
    </FormControl>
  );
}