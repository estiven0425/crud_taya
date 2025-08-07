import { Router } from "express";
import {
  getInventarioAp,
  createInventarioAp,
  updateInventarioAp,
  deleteInventarioAp,
} from "../controllers/inventarioApController.js";

const router = Router();

router.get("/", getInventarioAp);
router.post("/", createInventarioAp);
router.put("/", updateInventarioAp);
router.delete("/", deleteInventarioAp);

export default router;
