import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'start',
  },
  submitButton: {
    alignSelf: 'flex-end',
  },
  formError: {
    maxWidth: 300,
    height: 25,
    alignSelf: 'end',
    color: theme.palette.error.main,
  },
}));
