/* eslint-disable import/no-extraneous-dependencies, global-require */
const { when } = require("@craco/craco");
const CracoLessPlugin = require("craco-less");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

const antdTheme = require("./src/styling/antdTheme");

module.exports = {
  babel: {
    plugins: [
      [
        "import",
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: true,
        },
        "antd",
      ],
      [
        "import",
        {
          libraryName: "validator",
          libraryDirectory: "es/lib",
          camel2DashComponentName: false,
        },
        "validator",
      ],
      [
        "import",
        {
          libraryName: "@ant-design/icons",
          libraryDirectory: "lib/icons",
          camel2DashComponentName: false,
        },
        "antd-icons",
      ],
      ["lodash"],
    ],
  },
  webpack: {
    plugins: [
      new LodashModuleReplacementPlugin({ shorthands: true }),
      ...when(
        process.env.ANALYZE_BUILD === "true",
        () => {
          const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

          return [
            new BundleAnalyzerPlugin({
              analyzerHost: "0.0.0.0",
              analyzerPort: 3031,
              analyzerMode: "server",
            }),
          ];
        },
        []
      ),
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: antdTheme,
            javascriptEnabled: true,
          },
        },
      },
    },
    // ...whenDev(() => [{ plugin: require("craco-fast-refresh") }], []),
  ],
};
