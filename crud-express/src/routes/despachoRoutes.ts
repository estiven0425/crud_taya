import {
  getDespachos,
  createDespacho,
  updateDespachos,
  deleteDespachos,
} from "../controllers/despachoController.js";

import { Router } from "express";

const router = Router();

router.get("/", getDespachos);
router.post("/", createDespacho);
router.put("/", updateDespachos);
router.delete("/", deleteDespachos);

export default router;
