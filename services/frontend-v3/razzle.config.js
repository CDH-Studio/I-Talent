module.exports = {
  plugins: [
    {
      name: "scss",
      options: {
        javascriptEnabled: true,
        modifyVars: {
          "@primary-color": "#087472",
          "@link": "#00B9B2",
          "@success-color": "#00cc00",
          "@warning-color": "#ff661a",
          "@error-color": "#ff3333",
        },
      },
    },
  ],
};
