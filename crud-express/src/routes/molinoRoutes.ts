import { Router } from "express";
import {
  getMolinos,
  createMolino,
  updateMolinos,
  deleteMolinos,
} from "../controllers/molinoController.js";

const router = Router();

router.get("/", getMolinos);
router.post("/", createMolino);
router.put("/", updateMolinos);
router.delete("/", deleteMolinos);

export default router;
