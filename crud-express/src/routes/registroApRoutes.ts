import {
  getRegistrosAp,
  createRegistroAp,
  updateRegistrosAp,
  deleteRegistrosAp,
} from "../controllers/registroApController.js";

import { Router } from "express";

const router = Router();

router.get("/", getRegistrosAp);
router.post("/", createRegistroAp);
router.put("/", updateRegistrosAp);
router.delete("/", deleteRegistrosAp);

export default router;
