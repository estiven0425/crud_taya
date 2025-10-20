import {
  getProductosRechazados,
  createProductoRechazado,
  updateProductosRechazados,
  deleteProductosRechazados,
} from "../controllers/productoRechazadoController.js";

import { Router } from "express";

const router = Router();

router.get("/", getProductosRechazados);
router.post("/", createProductoRechazado);
router.put("/", updateProductosRechazados);
router.delete("/", deleteProductosRechazados);

export default router;
