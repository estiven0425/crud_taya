import { Request, Response } from "express";
import RegistrosAp from "../models/RegistrosAp.js";
import Usuarios from "../models/Usuarios.js";

export const getRegistrosAp = async (_req: Request, res: Response) => {
  const registrosAp = await RegistrosAp.findAll({
    include: [
      {
        model: Usuarios,
        attributes: ["nombre_usuario"],
        as: "titular",
        foreignKey: "titular_registro_ap",
      },
      {
        model: Usuarios,
        attributes: ["nombre_usuario"],
        as: "operador",
        foreignKey: "operador_registro_ap",
      },
      {
        model: Usuarios,
        attributes: ["nombre_usuario"],
        as: "carguero",
        foreignKey: "carguero_registro_ap",
      },
    ],
    where: { actividad_registro_ap: true },
  });

  res.json(registrosAp);
};

export const createRegistroAp = async (req: Request, res: Response) => {
  const {
    fecha_registro_ap,
    turno_registro_ap,
    mes_registro_ap,
    titular_registro_ap,
    operador_registro_ap,
    ingreso_roca_registro_ap,
    bobcat_roca_registro_ap,
    ingreso_grueso_registro_ap,
    bobcat_grueso_registro_ap,
    peso_bobcat_registro_ap,
    total_roca_registro_ap,
    total_grueso_registro_ap,
    molino_registro_ap,
    horometro_inicio_registro_ap,
    horometro_fin_registro_ap,
    carguero_registro_ap,
    observacion_registro_ap,
  } = req.body;

  const nuevoRegistroAp = await RegistrosAp.create({
    fecha_registro_ap,
    turno_registro_ap,
    mes_registro_ap,
    titular_registro_ap,
    operador_registro_ap,
    ingreso_roca_registro_ap,
    bobcat_roca_registro_ap,
    ingreso_grueso_registro_ap,
    bobcat_grueso_registro_ap,
    peso_bobcat_registro_ap,
    total_roca_registro_ap,
    total_grueso_registro_ap,
    molino_registro_ap,
    horometro_inicio_registro_ap,
    horometro_fin_registro_ap,
    carguero_registro_ap,
    observacion_registro_ap,
  });

  res.status(201).json(nuevoRegistroAp);
};

export const updateRegistrosAp = async (req: Request, res: Response) => {
  const {
    id_registro_ap,
    fecha_registro_ap,
    turno_registro_ap,
    mes_registro_ap,
    titular_registro_ap,
    operador_registro_ap,
    ingreso_roca_registro_ap,
    bobcat_roca_registro_ap,
    ingreso_grueso_registro_ap,
    bobcat_grueso_registro_ap,
    peso_bobcat_registro_ap,
    total_roca_registro_ap,
    total_grueso_registro_ap,
    molino_registro_ap,
    horometro_inicio_registro_ap,
    horometro_fin_registro_ap,
    carguero_registro_ap,
    observacion_registro_ap,
    actividad_registro_ap,
  } = req.body;

  const registroAp = await RegistrosAp.findByPk(id_registro_ap);

  if (!registroAp)
    return res.status(404).json({ message: "Registro AP no encontrado" });

  registroAp.set({
    fecha_registro_ap,
    turno_registro_ap,
    mes_registro_ap,
    titular_registro_ap,
    operador_registro_ap,
    ingreso_roca_registro_ap,
    bobcat_roca_registro_ap,
    ingreso_grueso_registro_ap,
    bobcat_grueso_registro_ap,
    peso_bobcat_registro_ap,
    total_roca_registro_ap,
    total_grueso_registro_ap,
    molino_registro_ap,
    horometro_inicio_registro_ap,
    horometro_fin_registro_ap,
    carguero_registro_ap,
    observacion_registro_ap,
    actividad_registro_ap,
  });

  await registroAp.save();

  res.json(registroAp);
};

export const deleteRegistrosAp = async (req: Request, res: Response) => {
  const { id_registro_ap } = req.body;

  const registroAp = await RegistrosAp.findByPk(id_registro_ap);

  if (!registroAp)
    return res.status(404).json({ message: "Registro AP no encontrado" });

  await registroAp.destroy();

  res.json({
    message: `Registro AP con id ${id_registro_ap} eliminado`,
  });
};
