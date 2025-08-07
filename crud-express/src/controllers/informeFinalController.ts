import { Request, Response } from "express";
import InformeFinal from "../models/InformeFinal.js";

export const getInformesFinales = async (_req: Request, res: Response) => {
  const informesFinales = await InformeFinal.findAll({
    where: { actividad_informe_final: true },
  });

  res.json(informesFinales);
};

export const createInformeFinal = async (req: Request, res: Response) => {
  const {
    fecha_informe_final,
    hora_informe_final,
    turno_informe_final,
    molino_informe_final,
    referencia_informe_final,
    bulto_informe_final,
    cantidad_informe_final,
    horometro_informe_final,
    observacion_informe_final,
  } = req.body;

  const nuevoInformeFinal = await InformeFinal.create({
    fecha_informe_final,
    hora_informe_final,
    turno_informe_final,
    molino_informe_final,
    referencia_informe_final,
    bulto_informe_final,
    cantidad_informe_final,
    horometro_informe_final,
    observacion_informe_final,
  });

  res.status(201).json(nuevoInformeFinal);
};

export const createFormInformeFinal = async (req: Request, res: Response) => {
  const informeFinal = req.body;

  const nuevoInformeFinal = await InformeFinal.bulkCreate(informeFinal);

  res.status(201).json(nuevoInformeFinal);
};

export const updateInformesFinales = async (req: Request, res: Response) => {
  const {
    id_informe_final,
    fecha_informe_final,
    hora_informe_final,
    turno_informe_final,
    molino_informe_final,
    referencia_informe_final,
    bulto_informe_final,
    cantidad_informe_final,
    horometro_informe_final,
    observacion_informe_final,
    actividad_informe_final,
  } = req.body;

  const informeFinal = await InformeFinal.findByPk(id_informe_final);

  if (!informeFinal)
    return res.status(404).json({ message: "Informe final no encontrado" });

  informeFinal.set({
    fecha_informe_final,
    hora_informe_final,
    turno_informe_final,
    molino_informe_final,
    referencia_informe_final,
    bulto_informe_final,
    cantidad_informe_final,
    horometro_informe_final,
    observacion_informe_final,
    actividad_informe_final,
  });

  await informeFinal.save();

  res.json(informeFinal);
};

export const deleteInformesFinales = async (req: Request, res: Response) => {
  const { id_informe_final } = req.body;

  const informeFinal = await InformeFinal.findByPk(id_informe_final);

  if (!informeFinal)
    return res.status(404).json({ message: "Informe final no encontrado" });

  await informeFinal.destroy();

  res.json({
    message: `Informe final con id ${id_informe_final} eliminado`,
  });
};
