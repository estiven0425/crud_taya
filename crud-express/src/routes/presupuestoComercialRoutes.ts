import { Router } from "express";
import {
  getPresupuestosComerciales,
  createPresupuestoComercial,
  updatePresupuestosComerciales,
  deletePresupuestosComerciales,
} from "../controllers/presupuestoComercialController.js";

const router = Router();

router.get("/", getPresupuestosComerciales);
router.post("/", createPresupuestoComercial);
router.put("/", updatePresupuestosComerciales);
router.delete("/", deletePresupuestosComerciales);

export default router;
