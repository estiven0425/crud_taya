import {
  getInformesFinales,
  createInformeFinal,
  createFormInformeFinal,
  updateInformesFinales,
  deleteInformesFinales,
} from "../controllers/informeFinalController.js";

import { Router } from "express";

const router = Router();

router.get("/", getInformesFinales);
router.post("/", createInformeFinal);
router.post("/form", createFormInformeFinal);
router.put("/", updateInformesFinales);
router.delete("/", deleteInformesFinales);

export default router;
