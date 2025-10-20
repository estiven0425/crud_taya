import {
  getRegistros,
  createRegistro,
  updateRegistros,
  deleteRegistros,
} from "../controllers/registroController.js";

import { Router } from "express";

const router = Router();

router.get("/", getRegistros);
router.post("/", createRegistro);
router.put("/", updateRegistros);
router.delete("/", deleteRegistros);

export default router;
