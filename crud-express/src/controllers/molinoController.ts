import { Request, Response } from "express";
import Molinos from "../models/Molinos.js";

export const getMolinos = async (_req: Request, res: Response) => {
  const molinos = await Molinos.findAll({
    where: { actividad_molino: true },
  });

  res.json(molinos);
};

export const createMolino = async (req: Request, res: Response) => {
  const item = req.body;

  const nuevoMolino = await Molinos.create(item);

  res.status(201).json(nuevoMolino);
};

export const updateMolinos = async (req: Request, res: Response) => {
  const { id_molino, nombre_molino, horometro_molino, actividad_molino } =
    req.body;

  const molino = await Molinos.findByPk(id_molino);

  if (!molino) return res.status(404).json({ message: "Molino no encontrada" });

  molino.set({
    nombre_molino,
    horometro_molino,
    actividad_molino,
  });

  await molino.save();

  res.json(molino);
};

export const deleteMolinos = async (req: Request, res: Response) => {
  const { id_molino } = req.body;

  const molino = await Molinos.findByPk(id_molino);

  if (!molino) return res.status(404).json({ message: "Molino no encontrado" });

  await molino.destroy();

  res.json({
    message: `Molino AP con id ${id_molino} eliminado`,
  });
};
