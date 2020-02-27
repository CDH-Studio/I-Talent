const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#007471",
      "@link": "#00B9B2",
      "@success-color": "#00cc00",
      "@warning-color": "#ff661a",
      "@error-color": "#ff3333"
    }
  })
);
