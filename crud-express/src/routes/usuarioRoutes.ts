import {
  getUsuarios,
  getFilterUsuarios,
  createUsuario,
  updateUsuarios,
  deleteUsuarios,
} from "../controllers/usuarioController.js";

import { Router } from "express";

const router = Router();

router.get("/", getUsuarios);
router.post("/informeinicialusuario", getFilterUsuarios);
router.post("/", createUsuario);
router.put("/", updateUsuarios);
router.delete("/", deleteUsuarios);

// @ts-ignore
export default router;
