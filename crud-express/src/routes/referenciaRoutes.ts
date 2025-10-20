import {
  getReferencias,
  createReferencia,
  updateReferencias,
  updateAmountReferencias,
  deleteReferencias,
} from "../controllers/referenciaController.js";

import { Router } from "express";

const router = Router();

router.get("/", getReferencias);
router.post("/", createReferencia);
router.put("/", updateReferencias);
router.put("/amount", updateAmountReferencias);
router.delete("/", deleteReferencias);

export default router;
