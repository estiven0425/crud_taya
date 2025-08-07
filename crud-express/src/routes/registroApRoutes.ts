import { Router } from "express";
import {
  getRegistrosAp,
  createRegistroAp,
  updateRegistrosAp,
  deleteRegistrosAp,
} from "../controllers/registroApController.js";

const router = Router();

router.get("/", getRegistrosAp);
router.post("/", createRegistroAp);
router.put("/", updateRegistrosAp);
router.delete("/", deleteRegistrosAp);

export default router;
