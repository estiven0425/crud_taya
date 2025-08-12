import { Request, Response } from "express";
import Perfiles from "../models/Perfiles.js";

export const getPerfiles = async (_req: Request, res: Response) => {
  const perfiles = await Perfiles.findAll({
    where: { actividad_perfil: true },
  });

  res.json(perfiles);
};

export const createPerfil = async (req: Request, res: Response) => {
  const item = req.body;

  const nuevoPerfil = await Perfiles.create(item);

  res.status(201).json(nuevoPerfil);
};

export const updatePerfiles = async (req: Request, res: Response) => {
  const { id_perfil, nombre_perfil, actividad_perfil } = req.body;

  const perfil = await Perfiles.findByPk(id_perfil);

  if (!perfil) return res.status(404).json({ message: "Perfil no encontrado" });

  perfil.set({
    nombre_perfil,
    actividad_perfil,
  });

  await perfil.save();

  res.json(perfil);
};

export const deletePerfiles = async (req: Request, res: Response) => {
  const { id_perfil } = req.body;

  const perfil = await Perfiles.findByPk(id_perfil);

  if (!perfil) return res.status(404).json({ message: "Perfil no encontrado" });

  await perfil.destroy();

  res.json({
    message: `Perfil con id ${id_perfil} eliminado`,
  });
};
