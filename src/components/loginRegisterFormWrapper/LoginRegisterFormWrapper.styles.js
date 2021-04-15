import { makeStyles } from '@material-ui/styles';

import logotype from '../../assets/bikely_logo_1.png';
import { theme } from '../../theme/theme';

export const useStyles = makeStyles(() => ({
  image: {
    margin: theme.spacing(2),
    borderRadius: `calc(2 * ${theme.shape.borderRadius}px)`,
    width: 144,
    height: 144,
    backgroundImage: `url(${logotype})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));
