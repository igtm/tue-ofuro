module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",

    // Basic Features: ESLint | Next.js https://nextjs.org/docs/basic-features/eslint
    // If you need to also include a separate, custom ESLint configuration, it is highly recommended that eslint-config-next is extended last after other configurations.
    "next",
    "next/core-web-vitals",
  ],
  rules: {
    "@next/next/no-img-element": 0,
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
