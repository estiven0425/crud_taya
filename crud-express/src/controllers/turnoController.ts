import { Request, Response } from "express";
import Turnos from "../models/Turnos.js";

export const getTurnos = async (_req: Request, res: Response) => {
  const turnos = await Turnos.findAll({
    where: { actividad_turno: true },
  });

  res.json(turnos);
};

export const createTurno = async (req: Request, res: Response) => {
  const item = req.body;

  const nuevoTurno = await Turnos.create(item);

  res.status(201).json(nuevoTurno);
};

export const updateTurnos = async (req: Request, res: Response) => {
  const { id_turno, nombre_turno, inicio_turno, fin_turno, actividad_turno } =
    req.body;

  const turno = await Turnos.findByPk(id_turno);

  if (!turno) return res.status(404).json({ message: "Turno no encontrado" });

  turno.set({
    nombre_turno,
    inicio_turno,
    fin_turno,
    actividad_turno,
  });

  await turno.save();

  res.json(turno);
};

export const deleteTurnos = async (req: Request, res: Response) => {
  const { id_turno } = req.body;

  const turno = await Turnos.findByPk(id_turno);

  if (!turno) return res.status(404).json({ message: "Turno no encontrado" });

  await turno.destroy();

  res.json({
    message: `Turno con id ${id_turno} eliminado`,
  });
};
