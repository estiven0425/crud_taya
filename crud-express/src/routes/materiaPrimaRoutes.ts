import {
  getMateriasPrimas,
  createMateriaPrima,
  updateMateriasPrimas,
  deleteMateriasPrimas,
} from "../controllers/materiaPrimaController.js";

import { Router } from "express";

const router = Router();

router.get("/", getMateriasPrimas);
router.post("/", createMateriaPrima);
router.put("/", updateMateriasPrimas);
router.delete("/", deleteMateriasPrimas);

export default router;
