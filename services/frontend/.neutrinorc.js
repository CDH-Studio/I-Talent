const react = require("@neutrinojs/react");
const jest = require("@neutrinojs/jest");
const antTheme = require("./src/antdTheme");
const path = require("path");
const webpack = require("webpack");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    react({
      devServer: {
        contentBase: path.join(__dirname, "public"),
        host: "0.0.0.0",
        port: 3000,
      },
      minify: {
        source: process.env.NODE_ENV === "production",
      },
      html: {
        template: "public/index.ejs",
        favicon: "public/favicon.ico",
      },
      target: {
        browsers: [
          "last 2 Chrome versions",
          "last 2 Firefox versions",
          "last 2 Edge versions",
          "last 2 Opera versions",
          "last 2 Safari versions",
          "last 2 iOS versions",
          "ie 11",
        ],
      },
      babel: {
        babelrc: true,
      },
      style: {
        test: /\.less/,
        modulesTest: /\.module\.less/,
        loaders: [
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
          {
            loader: "less-loader",
            useId: "less",
            options: {
              lessOptions: {
                modifyVars: antTheme,
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    }),
    ({ config }) => {
      if (process.env.NODE_ENV === "production") {
        config.optimization
          .minimize(true)
          .minimizer("terser-plugin")
          .use(require.resolve("terser-webpack-plugin"), [
            {
              terserOptions: {
                compress: {
                  arrows: false,
                },
              },
            },
          ]);
        config.optimization
          .minimize(true)
          .minimizer("css-minimizer")
          .use(require.resolve("css-minimizer-webpack-plugin"));
      }

      config
        .plugin("moment-ignore-locales")
        .use(webpack.IgnorePlugin, [/^\.\/locale$/, /moment$/]);
      config
        .plugin("slim-lodash")
        .use(LodashModuleReplacementPlugin, [{ shorthands: true }]);

      if (process.env.ANALYZE_BUILD === "true") {
        const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

        config.plugin("bundle-analyzer").use(BundleAnalyzerPlugin, [
          {
            analyzerHost: "0.0.0.0",
            analyzerPort: 3031,
            analyzerMode: "server",
          },
        ]);
      }
    },
    jest(),
  ],
};
