import { Router } from "express";
import {
  getInformesIniciales,
  createInformeInicial,
  createFormInformeInicial,
  updateInformesIniciales,
  deleteInformesIniciales,
} from "../controllers/informeInicialController.js";

const router = Router();

router.get("/", getInformesIniciales);
router.post("/", createInformeInicial);
router.post("/form", createFormInformeInicial);
router.put("/", updateInformesIniciales);
router.delete("/", deleteInformesIniciales);

export default router;
