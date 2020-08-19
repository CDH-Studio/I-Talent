const antdTheme = require("../src/antdTheme");

module.exports = (config) => ({
  ...config,
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /\.less$/,
        use: [
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: antdTheme,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [...config.plugins],
});
