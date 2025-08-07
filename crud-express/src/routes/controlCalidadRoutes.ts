import { Router } from "express";
import {
  getControlesCalidad,
  createControlCalidad,
  updateControlesCalidad,
  deleteControlesCalidad,
} from "../controllers/controlCalidadController.js";

const router = Router();

router.get("/", getControlesCalidad);
router.post("/", createControlCalidad);
router.put("/", updateControlesCalidad);
router.delete("/", deleteControlesCalidad);

export default router;
