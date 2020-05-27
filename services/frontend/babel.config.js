module.exports = {
  presets: [
    [
      "@babel/preset-react",
      {
        targets: {
          node: "current"
        }
      }
    ],
    "@babel/preset-env"
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "transform-es2015-modules-commonjs"
  ],
  env: {
    test: {
      plugins: ["@babel/plugin-transform-runtime"]
    }
  }
};
