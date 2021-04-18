import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { userState } from '../states/user';

export const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    userState.state.logout();
    history.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return '';
};
