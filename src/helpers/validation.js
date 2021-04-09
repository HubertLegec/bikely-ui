export const validateEmail = (email) => {
  if (!email) {
    return 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return 'Invalid email address';
  } else return '';
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Required';
  } else if (password.length < 8) {
    return 'Password too short';
  } else return '';
};

export const validateUsername = (username) => {
  if (!username) {
    return 'Required';
  } else if (username.length < 5) {
    return 'Username too short';
  } else return '';
};
