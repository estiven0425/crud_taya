import {
  getTurnos,
  createTurno,
  updateTurnos,
  deleteTurnos,
} from "../controllers/turnoController.js";

import { Router } from "express";

const router = Router();

router.get("/", getTurnos);
router.post("/", createTurno);
router.put("/", updateTurnos);
router.delete("/", deleteTurnos);

export default router;
