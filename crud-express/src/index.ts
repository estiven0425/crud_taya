import "dotenv/config";
import cors from "cors";
import express from "express";

import { dbConnection } from "./config/database.js";

import bobCatRoutes from "./routes/bobCatRoutes.js";

const app = express();
const port = process.env.PORT!;

app.use(cors());
app.use(express.json());

app.use("/bob_cats", bobCatRoutes);

dbConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((error: any) => {
    console.error("Error al conectar con la base de datos:", error);
  });
