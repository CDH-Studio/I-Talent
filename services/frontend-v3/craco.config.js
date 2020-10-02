const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const WebpackBar = require("webpackbar");
const CracoAntDesignPlugin = require("craco-antd");
const antdTheme = require("./src/antdTheme");

// Don't open the browser during development
process.env.BROWSER = "none";

module.exports = {
  webpack: {
    plugins: [
      new WebpackBar({ profile: true }),
      new AntdDayjsWebpackPlugin(),
      ...(process.env.NODE_ENV === "development"
        ? [new BundleAnalyzerPlugin({ openAnalyzer: false })]
        : []),
    ],
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: antdTheme,
      },
    },
  ],
};
