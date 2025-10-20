import {
  getPerfiles,
  createPerfil,
  updatePerfiles,
  deletePerfiles,
} from "../controllers/perfilController.js";

import { Router } from "express";

const router = Router();

router.get("/", getPerfiles);
router.post("/", createPerfil);
router.put("/", updatePerfiles);
router.delete("/", deletePerfiles);

export default router;
