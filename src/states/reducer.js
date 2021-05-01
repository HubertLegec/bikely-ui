export const SET_PROFILE = 'SET_PROFILE';
export const CLEAR_PROFILE = 'CLEAR_PROFILE';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const CLEAR_ACCESS_TOKEN = 'CLEAR_ACCESS_TOKEN';

export const userReducer = (state, action) => {
  const { profile, accessToken } = state;

  switch (action.type) {
    case SET_PROFILE:
      localStorage.setItem('profile', JSON.stringify(action.profile));

      return { accessToken, profile: action.profile };
    case CLEAR_PROFILE:
      localStorage.removeItem('profile');

      return { accessToken, profile: {} };
    case SET_ACCESS_TOKEN:
      localStorage.setItem('accessToken', action.accessToken);

      return { profile, accessToken: action.accessToken };
    case CLEAR_ACCESS_TOKEN:
      localStorage.removeItem('accessToken');

      return { profile: action.profile, accessToken: '' };
    default:
      return state;
  }
};
