import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

import { theme } from '../../../theme/theme';

export const useStyles = makeStyles(() => ({
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'start',
  },
  submitButton: {
    alignSelf: 'flex-end',
    position: 'relative',
  },
  formError: {
    maxWidth: 300,
    height: 25,
    alignSelf: 'end',
    color: theme.palette.error.main,
  },
  header: {
    textAlign: 'left',
    fontWeight: theme.typography.fontWeightBold,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));
