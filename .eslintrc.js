module.exports = {
  extends: "eslint:recommended",
  parser: "babel-eslint",
  root: true,
  env: {
    browser: true,
    jest: true,
  },
  globals: ["cy", "Cypress"],
  ignorePatterns: [".eslintrc.js"],
};
