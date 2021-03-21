import { FormHelperText, FormControl, InputLabel, Input } from "@material-ui/core";

export function PasswordInput(props) {
  return (
    <FormControl>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <Input error={props.errors ? true : false} id={props.id} name={props.name} onChange={e => props.onChange(e)} aria-describedby="password-input-field" />
      <FormHelperText>{props.errors ? props.errors : ""}</FormHelperText>
    </FormControl>
  );
}
