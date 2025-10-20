import { Request, Response } from "express";

import Despachos from "../models/Despachos.js";

export const getDespachos = async (_req: Request, res: Response) => {
  const despachos = await Despachos.findAll({
    where: { actividad_despacho: true },
  });

  res.json(despachos);
};

export const createDespacho = async (req: Request, res: Response) => {
  const item = req.body;

  const nuevoDespacho = await Despachos.create(item);

  res.status(201).json(nuevoDespacho);
};

export const updateDespachos = async (req: Request, res: Response) => {
  const { id_despacho, fecha_despacho, cantidad_despacho, actividad_despacho } =
    req.body;

  const despacho = await Despachos.findByPk(id_despacho);

  if (!despacho)
    return res.status(404).json({ message: "Despacho no encontrado" });

  despacho.set({
    fecha_despacho,
    cantidad_despacho,
    actividad_despacho,
  });

  await despacho.save();

  res.json(despacho);
};

export const deleteDespachos = async (req: Request, res: Response) => {
  const { id_despacho } = req.body;

  const despacho = await Despachos.findByPk(id_despacho);

  if (!despacho)
    return res.status(404).json({ message: "Despacho no encontrado" });

  await despacho.destroy();

  res.json({
    message: `Despacho con id ${id_despacho} eliminado`,
  });
};
