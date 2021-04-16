import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  nav: {
    backgroundColor: 'white',

    '& button': {
      color: 'white',
    },
  },
}));
