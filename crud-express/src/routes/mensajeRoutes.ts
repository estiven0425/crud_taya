import { Router } from "express";
import {
  getMensajes,
  createMensaje,
  updateMensajes,
  deleteMensajes,
} from "../controllers/mensajeController.js";

const router = Router();

router.get("/", getMensajes);
router.post("/", createMensaje);
router.put("/", updateMensajes);
router.delete("/", deleteMensajes);

export default router;
