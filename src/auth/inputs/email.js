import { FormHelperText, FormControl, InputLabel, Input } from "@material-ui/core";

export function EmailInput(props) {
  return (
    <FormControl>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <Input error={props.errors ? true : false} id={props.id} name={props.name} onChange={e => props.onChange(e)} aria-describedby="email-input-field" />
      <FormHelperText>{props.errors ? props.errors : ""}</FormHelperText>
    </FormControl>
  );
}