module.exports = {
  extends: "eslint:recommended",
  parser: "babel-eslint",
  root: true,
  env: {
    browser: true,
    jest: true,
    cypress: true,
  },
  ignorePatterns: [".eslintrc.js"],
};
