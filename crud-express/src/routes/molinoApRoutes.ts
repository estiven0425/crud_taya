import { Router } from "express";
import {
  getMolinosAp,
  createMolinoAp,
  updateMolinosAp,
  deleteMolinosAp,
} from "../controllers/molinoApController.js";

const router = Router();

router.get("/", getMolinosAp);
router.post("/", createMolinoAp);
router.put("/", updateMolinosAp);
router.delete("/", deleteMolinosAp);

export default router;
