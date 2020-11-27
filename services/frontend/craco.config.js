/* eslint-disable import/no-extraneous-dependencies, global-require, no-param-reassign */
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
    // The following can be removed when craco fixes support for react-scripts v4
    {
      plugin: {
        overrideCracoConfig: ({ cracoConfig }) => {
          if (typeof cracoConfig.eslint.enable !== "undefined") {
            cracoConfig.disableEslint = !cracoConfig.eslint.enable;
          }
          delete cracoConfig.eslint;
          return cracoConfig;
        },
        overrideWebpackConfig: ({ webpackConfig, cracoConfig }) => {
          if (
            typeof cracoConfig.disableEslint !== "undefined" &&
            cracoConfig.disableEslint === true
          ) {
            webpackConfig.plugins = webpackConfig.plugins.filter(
              (instance) => instance.constructor.name !== "ESLintWebpackPlugin"
            );
          }
          return webpackConfig;
        },
      },
    },
  ],
};
