import { Request, Response } from "express";

import Paros from "../models/Paros.js";

export const getParos = async (_req: Request, res: Response) => {
  const paros = await Paros.findAll({
    where: { actividad_paro: true },
  });

  res.json(paros);
};

export const createParos = async (req: Request, res: Response) => {
  const item = req.body;

  const nuevoParo = await Paros.create(item);

  res.status(201).json(nuevoParo);
};

export const updateParos = async (req: Request, res: Response) => {
  const { id_paro, nombre_paro, actividad_paro } = req.body;

  const paro = await Paros.findByPk(id_paro);

  if (!paro)
    return res.status(404).json({ message: "Tipo de paro no encontrado" });

  paro.set({ nombre_paro, actividad_paro });

  await paro.save();

  res.json(paro);
};

export const deleteParos = async (req: Request, res: Response) => {
  const { id_paro } = req.body;

  const paro = await Paros.findByPk(id_paro);

  if (!paro)
    return res.status(404).json({ message: "Tipo de paro no encontrado" });

  await paro.destroy();

  res.json({ message: `Tipo de paro con id ${id_paro} eliminado` });
};
