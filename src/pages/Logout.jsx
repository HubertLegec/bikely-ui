import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { BikelyApi } from '../api/BikelyApi';

export const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    BikelyApi.logout();
    history.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return '';
};
