import { Request, Response } from "express";
import Referencias from "../models/Referencias.js";

export const getReferencias = async (_req: Request, res: Response) => {
  const referencias = await Referencias.findAll({
    where: { actividad_referencia: true },
  });

  res.json(referencias);
};

export const createReferencia = async (req: Request, res: Response) => {
  const item =
    req.body;

  const nuevaReferencia = await Referencias.create(item);

  res.status(201).json(nuevaReferencia);
};

export const updateReferencias = async (req: Request, res: Response) => {
  const {
    id_referencia,
    nombre_referencia,
    cantidad_referencia,
    cliente_referencia,
    actividad_referencia,
  } = req.body;

  const referencia = await Referencias.findByPk(id_referencia);

  if (!referencia)
    return res.status(404).json({ message: "Referencia no encontrada" });

  referencia.set({
    nombre_referencia,
    cantidad_referencia,
    cliente_referencia,
    actividad_referencia,
  });

  await referencia.save();

  res.json(referencia);
};

export const deleteReferencias = async (req: Request, res: Response) => {
  const { id_referencia } = req.body;

  const referencia = await Referencias.findByPk(id_referencia);

  if (!referencia)
    return res.status(404).json({ message: "Referencia no encontrada" });

  await referencia.destroy();

  res.json({
    message: `Referencia con id ${id_referencia} eliminada`,
  });
};
