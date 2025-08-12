import { Request, Response } from "express";
import MateriasPrimas from "../models/MateriasPrimas.js";

export const getMateriasPrimas = async (_req: Request, res: Response) => {
  const materiasPrimas = await MateriasPrimas.findAll({
    where: { actividad_materia_prima: true },
  });

  res.json(materiasPrimas);
};

export const createMateriaPrima = async (req: Request, res: Response) => {
  const item = req.body;

  const nuevaMateriaPrima = await MateriasPrimas.create(item);

  res.status(201).json(nuevaMateriaPrima);
};

export const updateMateriasPrimas = async (req: Request, res: Response) => {
  const {
    id_materia_prima,
    nombre_materia_prima,
    cantidad_materia_prima,
    actividad_materia_prima,
  } = req.body;

  const materiaPrima = await MateriasPrimas.findByPk(id_materia_prima);

  if (!materiaPrima)
    return res.status(404).json({ message: "Materia prima no encontrada" });

  materiaPrima.set({
    nombre_materia_prima,
    cantidad_materia_prima,
    actividad_materia_prima,
  });

  await materiaPrima.save();

  res.json(materiaPrima);
};

export const deleteMateriasPrimas = async (req: Request, res: Response) => {
  const { id_materia_prima } = req.body;

  const materiaPrima = await MateriasPrimas.findByPk(id_materia_prima);

  if (!materiaPrima)
    return res.status(404).json({ message: "Materia prima no encontrada" });

  await materiaPrima.destroy();

  res.json({
    message: `Materia prima con id ${id_materia_prima} eliminada`,
  });
};
