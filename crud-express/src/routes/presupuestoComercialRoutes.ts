import {
  getPresupuestosComerciales,
  createPresupuestoComercial,
  updatePresupuestosComerciales,
  deletePresupuestosComerciales,
} from "../controllers/presupuestoComercialController.js";

import { Router } from "express";

const router = Router();

router.get("/", getPresupuestosComerciales);
router.post("/", createPresupuestoComercial);
router.put("/", updatePresupuestosComerciales);
router.delete("/", deletePresupuestosComerciales);

export default router;
