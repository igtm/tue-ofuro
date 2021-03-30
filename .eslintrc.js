module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["jsx-a11y", "react-hooks", "react", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-unused-vars": 1,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/no-onchange": 0,
    "no-empty": 0,
    "no-empty-pattern": 0,
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
