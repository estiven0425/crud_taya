import { Router } from "express";
import {
  getRegistros,
  createRegistro,
  updateRegistros,
  deleteRegistros,
} from "../controllers/registroController.js";

const router = Router();

router.get("/", getRegistros);
router.post("/", createRegistro);
router.put("/", updateRegistros);
router.delete("/", deleteRegistros);

export default router;
