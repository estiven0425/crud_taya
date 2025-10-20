import { fileURLToPath } from "url";

import cors from "cors";
import express from "express";
import path from "path";

import "dotenv/config";

import { dbConnection } from "./config/database.js";

import bobCatRoutes from "./routes/bobCatRoutes.js";
import bultoRoutes from "./routes/bultoRoutes.js";
import controlCalidadRoutes from "./routes/controlCalidadRoutes.js";
import despachoComercialRoutes from "./routes/despachoComercialRoutes.js";
import despachoRoutes from "./routes/despachoRoutes.js";
import informeFinalRoutes from "./routes/informeFinalRoutes.js";
import informeInicialRoutes from "./routes/informeInicialRoutes.js";
import inventarioApRoutes from "./routes/inventarioApRoutes.js";
import materiaPrimaRoutes from "./routes/materiaPrimaRoutes.js";
import mensajeRoutes from "./routes/mensajeRoutes.js";
import molinoApRoutes from "./routes/molinoApRoutes.js";
import molinoRoutes from "./routes/molinoRoutes.js";
import novedadRoutes from "./routes/novedadRoutes.js";
import perfilRoutes from "./routes/perfilRoutes.js";
import presupuestoComercialRoutes from "./routes/presupuestoComercialRoutes.js";
import productoRechazadoRoutes from "./routes/productoRechazadoRoutes.js";
import referenciaRoutes from "./routes/referenciaRoutes.js";
import registroRoutes from "./routes/registroRoutes.js";
import registroApRoutes from "./routes/registroApRoutes.js";
import turnoRoutes from "./routes/turnoRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();
const port = process.env.PORT!;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(path.dirname(__filename), "..");

app.use(cors());
app.use(express.json());

app.use("/bob_cats", bobCatRoutes);
app.use("/bultos", bultoRoutes);
app.use("/controles_calidad", controlCalidadRoutes);
app.use("/despachos_comerciales", despachoComercialRoutes);
app.use("/despachos", despachoRoutes);
app.use("/informes_finales", informeFinalRoutes);
app.use("/informes_iniciales", informeInicialRoutes);
app.use("/inventario_ap", inventarioApRoutes);
app.use("/materias_primas", materiaPrimaRoutes);
app.use("/mensajes", mensajeRoutes);
app.use("/molinos_ap", molinoApRoutes);
app.use("/molinos", molinoRoutes);
app.use("/novedades", novedadRoutes);
app.use("/perfiles", perfilRoutes);
app.use("/presupuestos_comerciales", presupuestoComercialRoutes);
app.use("/productos_rechazados", productoRechazadoRoutes);
app.use("/referencias", referenciaRoutes);
app.use("/registros", registroRoutes);
app.use("/registros_ap", registroApRoutes);
app.use("/turnos", turnoRoutes);
app.use("/usuarios", usuarioRoutes);

app.use(express.static(path.join(__dirname, "dist")));

app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

dbConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((error: any) => {
    console.error("Error al conectar con la base de datos:", error);
  });
