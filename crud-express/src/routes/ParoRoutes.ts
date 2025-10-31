import {
  getParos,
  createParos,
  updateParos,
  deleteParos,
} from "../controllers/paroController.js";

import { Router } from "express";

const router = Router();

router.get("/", getParos);
router.post("/", createParos);
router.put("/", updateParos);
router.delete("/", deleteParos);

export default router;
