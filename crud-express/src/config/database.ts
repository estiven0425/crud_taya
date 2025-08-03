import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST!,
    dialect: "mysql",
    port: Number(process.env.DB_PORT!),
    logging: false,
  },
);

export const dbConnection = async () => {
  try {
    await sequelize.authenticate();

    console.log("Conexión a la base de datos exitosa.");
  } catch (error) {
    throw error;
  }
};
