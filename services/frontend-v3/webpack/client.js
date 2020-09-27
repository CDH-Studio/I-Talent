const antdTheme = require("../src/antdTheme");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;
//const WebpackMonitor = require("webpack-monitor");

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
    //new BundleAnalyzerPlugin(),
  ],
});
