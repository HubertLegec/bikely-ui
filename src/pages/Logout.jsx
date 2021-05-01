import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { CLEAR_ACCESS_TOKEN, CLEAR_PROFILE } from '../states/reducer';
import { StoreContext } from '../states/Store';

export const Logout = () => {
  const history = useHistory();
  const { dispatch } = useContext(StoreContext);

  useEffect(() => {
    dispatch({ type: CLEAR_ACCESS_TOKEN });
    dispatch({ type: CLEAR_PROFILE });
    history.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return '';
};
