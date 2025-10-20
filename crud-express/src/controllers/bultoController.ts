import { Request, Response } from "express";

import Bultos from "../models/Bultos.js";

export const getBultos = async (_req: Request, res: Response) => {
  const bultos = await Bultos.findAll({
    where: { actividad_bulto: true },
  });

  res.json(bultos);
};

export const createBultos = async (req: Request, res: Response) => {
  const item = req.body;

  const nuevoBulto = await Bultos.create(item);

  res.status(201).json(nuevoBulto);
};

export const updateBultos = async (req: Request, res: Response) => {
  const { id_bulto, nombre_bulto, capacidad_bulto, actividad_bulto } = req.body;

  const bulto = await Bultos.findByPk(id_bulto);

  if (!bulto) return res.status(404).json({ message: "Bulto no encontrado" });

  bulto.set({ nombre_bulto, capacidad_bulto, actividad_bulto });

  await bulto.save();

  res.json(bulto);
};

export const deleteBultos = async (req: Request, res: Response) => {
  const { id_bulto } = req.body;

  const bulto = await Bultos.findByPk(id_bulto);

  if (!bulto) return res.status(404).json({ message: "Bulto no encontrado" });

  await bulto.destroy();

  res.json({ message: `Bulto con id ${id_bulto} eliminado` });
};
