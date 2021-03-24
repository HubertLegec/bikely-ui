export function validateEmail(email) {
  if (!email) {
    return "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return "Invalid email address";
  } else return "";
}

export function validatePassword(password) {
  if (!password) {
    return "Required";
  } else if (password.length < 8) {
    return "Password too short";
  } else return "";
}

export function validateUsername(username) {
  if (!username) {
    return "Required";
  } else if (username.length < 5) {
    return "Password too short";
  } else return "";
}
