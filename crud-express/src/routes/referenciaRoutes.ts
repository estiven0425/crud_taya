import { Router } from "express";
import {
  getReferencias,
  createReferencia,
  updateReferencias,
  deleteReferencias,
} from "../controllers/referenciaController.js";

const router = Router();

router.get("/", getReferencias);
router.post("/", createReferencia);
router.put("/", updateReferencias);
router.delete("/", deleteReferencias);

export default router;
