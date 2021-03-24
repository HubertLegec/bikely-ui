import { RegisterForm } from "../components/forms/register";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export function RegisterPage() {
  const classes = useStyles();
  return (
    <Grid alignItems="center" justify="center" style={{ minHeight: "100vh" }} container spacing={0}>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <RegisterForm></RegisterForm>
        </Paper>
      </Grid>
    </Grid>
  );
}
