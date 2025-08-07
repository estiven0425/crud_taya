import { Request, Response } from "express";
import ControlCalidad from "../models/ControlCalidad.js";

export const getControlesCalidad = async (_req: Request, res: Response) => {
  const controlesCalidad = await ControlCalidad.findAll({
    where: { actividad_control_calidad: true },
  });

  res.json(controlesCalidad);
};

export const createControlCalidad = async (req: Request, res: Response) => {
  const {
    fecha_control_calidad,
    hora_control_calidad,
    turno_control_calidad,
    molino_control_calidad,
    referencia_control_calidad,
    bulto_control_calidad,
    retencion_control_calidad,
    rechazado_control_calidad,
    observacion_control_calidad,
  } = req.body;

  const nuevoControlCalidad = await ControlCalidad.create({
    fecha_control_calidad,
    hora_control_calidad,
    turno_control_calidad,
    molino_control_calidad,
    referencia_control_calidad,
    bulto_control_calidad,
    retencion_control_calidad,
    rechazado_control_calidad,
    observacion_control_calidad,
  });

  res.status(201).json(nuevoControlCalidad);
};

export const updateControlesCalidad = async (req: Request, res: Response) => {
  const {
    id_control_calidad,
    fecha_control_calidad,
    hora_control_calidad,
    turno_control_calidad,
    molino_control_calidad,
    referencia_control_calidad,
    bulto_control_calidad,
    retencion_control_calidad,
    rechazado_control_calidad,
    observacion_control_calidad,
    actividad_control_calidad,
  } = req.body;

  const controlCalidad = await ControlCalidad.findByPk(id_control_calidad);

  if (!controlCalidad)
    return res
      .status(404)
      .json({ message: "Control de calidad no encontrado" });

  controlCalidad.set({
    fecha_control_calidad,
    hora_control_calidad,
    turno_control_calidad,
    molino_control_calidad,
    referencia_control_calidad,
    bulto_control_calidad,
    retencion_control_calidad,
    rechazado_control_calidad,
    observacion_control_calidad,
    actividad_control_calidad,
  });

  await controlCalidad.save();

  res.json(controlCalidad);
};

export const deleteControlesCalidad = async (req: Request, res: Response) => {
  const { id_control_calidad } = req.body;

  const controlCalidad = await ControlCalidad.findByPk(id_control_calidad);

  if (!controlCalidad)
    return res
      .status(404)
      .json({ message: "Control de calidad no encontrado" });

  await controlCalidad.destroy();

  res.json({
    message: `Control de calidad con id ${id_control_calidad} eliminado`,
  });
};
