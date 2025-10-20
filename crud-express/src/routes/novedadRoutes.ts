import {
  getNovedades,
  createNovedad,
  createFormNovedad,
  updateNovedades,
  deleteNovedades,
} from "../controllers/novedadController.js";

import { Router } from "express";

const router = Router();

router.get("/", getNovedades);
router.post("/", createNovedad);
router.post("/form", createFormNovedad);
router.put("/", updateNovedades);
router.delete("/", deleteNovedades);

export default router;
