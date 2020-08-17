const antdTheme = require("../src/antdTheme");

module.exports = (config) => ({
  ...config,
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/react", "@babel/preset-env"],
        },
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              modifyVars: antdTheme,
            },
          },
        ],
      },
    ],
  },
  plugins: [...config.plugins],
});
