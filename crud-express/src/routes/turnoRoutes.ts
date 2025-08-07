import { Router } from "express";
import {
  getTurnos,
  createTurno,
  updateTurnos,
  deleteTurnos,
} from "../controllers/turnoController.js";

const router = Router();

router.get("/", getTurnos);
router.post("/", createTurno);
router.put("/", updateTurnos);
router.delete("/", deleteTurnos);

export default router;
