import { Router } from "express";
import {
  getBultos,
  createBultos,
  updateBultos,
  deleteBultos,
} from "../controllers/bultoController.js";

const router = Router();

router.get("/", getBultos);
router.post("/", createBultos);
router.put("/", updateBultos);
router.delete("/", deleteBultos);

export default router;
