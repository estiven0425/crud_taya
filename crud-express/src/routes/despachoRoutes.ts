import { Router } from "express";
import {
  getDespachos,
  createDespacho,
  updateDespachos,
  deleteDespachos,
} from "../controllers/despachoController.js";

const router = Router();

router.get("/", getDespachos);
router.post("/", createDespacho);
router.put("/", updateDespachos);
router.delete("/", deleteDespachos);

export default router;
