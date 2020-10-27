const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const CracoAntDesignPlugin = require("craco-antd");
const { when, whenDev } = require("@craco/craco");

const antdTheme = require("./src/antdTheme");

module.exports = {
  webpack: {
    plugins: [
      new AntdDayjsWebpackPlugin(),
      ...when(
        process.env.ANALYZE_BUILD === "true",
        () => {
          const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

          return [new BundleAnalyzerPlugin({ analyzerHost: "0.0.0.0" })];
        },
        []
      ),
    ],
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: antdTheme,
      },
    },
    ...whenDev(() => [{ plugin: require("craco-fast-refresh") }], []),
  ]
};
