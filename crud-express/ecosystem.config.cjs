module.exports = {
  apps: [
    {
      name: "crud-express",
      script: "./dist/index.js",
      watch: true,
      interpreter: "node",
      env_development: {
        NODE_ENV: "development",
        PORT: 3001,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],
};
