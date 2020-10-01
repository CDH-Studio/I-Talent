module.exports = {
  modify: (config, { target }) => {
    const targetName = target === "node" ? "server" : "client";
    // eslint-disable-next-line import/no-dynamic-require, global-require
    return require(`./webpack/${targetName}`)(config);
  },
  plugins: [
    "scss",
    {
      name: "bundle-analyzer",
      options: {
        analyzerHost: "0.0.0.0",
        analyzerPort: "8888",
      },
    },
  ],
};
