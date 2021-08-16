module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["airbnb", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["prettier", "react-hooks", "simple-import-sort", "sort-keys-fix"],
  rules: {
    "react-hooks/exhaustive-deps": "warn",
    "react/react-in-jsx-scope": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-sort-props": "error",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Side effect imports.
          ["^\\u0000"],
          // `react` related packages come first.
          // Packages that start with a letter (or digit or underscore), or `@` followed by a letter.
          ["^react", "^@?\\w"],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything not matched in another group.
          ["^"],
          // Relative imports.
          // Anything that starts with a dot.
          ["^\\."],
          // Style imports.
          ["^.+\\.less$"],
        ],
      },
    ],
    "simple-import-sort/exports": "error",
    "sort-keys-fix/sort-keys-fix": "error",
  },
};
