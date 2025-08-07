import { Router } from "express";
import {
  getPerfiles,
  createPerfil,
  updatePerfiles,
  deletePerfiles,
} from "../controllers/perfilController.js";

const router = Router();

router.get("/", getPerfiles);
router.post("/", createPerfil);
router.put("/", updatePerfiles);
router.delete("/", deletePerfiles);

export default router;
