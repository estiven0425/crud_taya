import { Router } from "express";
import {
  getMolinos,
  createMolino,
  updateMolinos,
  updateHoursMolinos,
  deleteMolinos,
} from "../controllers/molinoController.js";

const router = Router();

router.get("/", getMolinos);
router.post("/", createMolino);
router.put("/", updateMolinos);
router.put("/hours", updateHoursMolinos);
router.delete("/", deleteMolinos);

export default router;
