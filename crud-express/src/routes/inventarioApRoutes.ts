import {
  getInventarioAp,
  createInventarioAp,
  updateInventarioAp,
  deleteInventarioAp,
} from "../controllers/inventarioApController.js";

import { Router } from "express";

const router = Router();

router.get("/", getInventarioAp);
router.post("/", createInventarioAp);
router.put("/", updateInventarioAp);
router.delete("/", deleteInventarioAp);

export default router;
