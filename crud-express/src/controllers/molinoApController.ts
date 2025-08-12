import { Request, Response } from "express";
import MolinosAp from "../models/MolinosAp.js";

export const getMolinosAp = async (_req: Request, res: Response) => {
  const molinosAp = await MolinosAp.findAll({
    where: { actividad_molino_ap: true },
  });

  res.json(molinosAp);
};

export const createMolinoAp = async (req: Request, res: Response) => {
  const item = req.body;

  const nuevoMolinoAp = await MolinosAp.create(item);

  res.status(201).json(nuevoMolinoAp);
};

export const updateMolinosAp = async (req: Request, res: Response) => {
  const {
    id_molino_ap,
    nombre_molino_ap,
    horometro_molino_ap,
    actividad_molino_ap,
  } = req.body;

  const molinoAp = await MolinosAp.findByPk(id_molino_ap);

  if (!molinoAp)
    return res.status(404).json({ message: "Molino AP no encontrada" });

  molinoAp.set({
    nombre_molino_ap,
    horometro_molino_ap,
    actividad_molino_ap,
  });

  await molinoAp.save();

  res.json(molinoAp);
};

export const deleteMolinosAp = async (req: Request, res: Response) => {
  const { id_molino_ap } = req.body;

  const molinoAp = await MolinosAp.findByPk(id_molino_ap);

  if (!molinoAp)
    return res.status(404).json({ message: "Molino AP no encontrado" });

  await molinoAp.destroy();

  res.json({
    message: `Molino AP con id ${id_molino_ap} eliminado`,
  });
};
