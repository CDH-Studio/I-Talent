const react = require("@neutrinojs/react");
const jest = require("@neutrinojs/jest");
const style = require("@neutrinojs/style-loader");
const antTheme = require("./src/antdTheme");
const path = require("path");

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
      babel: {
        plugins: [
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
              libraryName: "antd",
              libraryDirectory: "es",
              style: true,
            },
            "antd",
          ],
        ],
      },
      style: {
        test: /\.(css|scss)$/,
        modulesTest: /\.module\.(css|scss)$/,
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
            loader: "sass-loader",
            useId: "sass",
          },
        ],
      },
    }),
    style({
      test: /\.less/,
      modulesTest: /\.module\.less$/,
      ruleId: "style-less",
      styleUseId: "style-less",
      cssUseId: "css-less",
      extractId: "extract-less",
      loaders: [
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
    }),
    ({ config }) => {
      if (process.env.NODE_ENV === "production") {
        config.optimization
          .minimize(true)
          .minimizer("terser-plugin")
          .use(require.resolve("terser-webpack-plugin"));
        config.optimization
          .minimize(true)
          .minimizer("css-minimizer")
          .use(require.resolve("css-minimizer-webpack-plugin"));
      }

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
