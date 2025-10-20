import {
  getBobCats,
  createBobCats,
  updateBobCats,
  deleteBobCats,
} from "../controllers/bobCatController.js";

import { Router } from "express";

const router = Router();

router.get("/", getBobCats);
router.post("/", createBobCats);
router.put("/", updateBobCats);
router.delete("/", deleteBobCats);

export default router;
