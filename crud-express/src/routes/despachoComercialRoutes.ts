import { Router } from "express";
import {
  getDespachosComerciales,
  createDespachoComercial,
  updateDespachosComerciales,
  deleteDespachosComerciales,
} from "../controllers/despachoComercialController.js";

const router = Router();

router.get("/", getDespachosComerciales);
router.post("/", createDespachoComercial);
router.put("/", updateDespachosComerciales);
router.delete("/", deleteDespachosComerciales);

export default router;
