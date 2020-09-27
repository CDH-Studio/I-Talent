const antdTheme = require("../src/antdTheme");
const BundleAnalyzerPlugin = require("@bundle-analyzer/webpack-plugin");

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
  plugins: [
    ...config.plugins,
    new BundleAnalyzerPlugin({
      token: "0696dd75993212ae0e786629147615f2bacf128f",
    }),
  ],
});
