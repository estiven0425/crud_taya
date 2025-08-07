import { Router } from "express";
import {
  getUsuarios,
  createUsuario,
  updateUsuarios,
  deleteUsuarios,
} from "../controllers/usuarioController.js";

const router = Router();

router.get("/", getUsuarios);
router.post("/", createUsuario);
router.put("/", updateUsuarios);
router.delete("/", deleteUsuarios);

export default router;
