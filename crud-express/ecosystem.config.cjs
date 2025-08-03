module.exports = {
  apps: [
    {
      name: "crud-express",
      script: "src/index.ts",
      watch: true,
      interpreter: "ts-node",
      node_args: "--loader ts-node/esm",
      env_development: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
