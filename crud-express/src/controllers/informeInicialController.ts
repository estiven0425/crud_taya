import { Request, Response } from "express";

import InformeInicial from "../models/InformeInicial.js";
import Usuarios from "../models/Usuarios.js";

export const getInformesIniciales = async (_req: Request, res: Response) => {
  const informesIniciales = await InformeInicial.findAll({
    include: [
      {
        model: Usuarios,
        attributes: ["nombre_usuario"],
        as: "titular",
        foreignKey: "titular_informe_inicial",
      },
      {
        model: Usuarios,
        attributes: ["nombre_usuario"],
        as: "operador",
        foreignKey: "operador_informe_inicial",
      },
      {
        model: Usuarios,
        attributes: ["nombre_usuario"],
        as: "carguero",
        foreignKey: "carguero_informe_inicial",
      },
      {
        model: Usuarios,
        attributes: ["nombre_usuario"],
        as: "mecanico",
        foreignKey: "mecanico_informe_inicial",
      },
      {
        model: Usuarios,
        attributes: ["nombre_usuario"],
        as: "cdc",
        foreignKey: "cdc_informe_inicial",
      },
    ],
    where: { actividad_informe_inicial: true },
  });

  res.json(informesIniciales);
};

export const createInformeInicial = async (req: Request, res: Response) => {
  const item = req.body;

  const nuevoInformeInicial = await InformeInicial.create(item);

  res.status(201).json(nuevoInformeInicial);
};

export const createFormInformeInicial = async (req: Request, res: Response) => {
  const informeInicial = req.body;

  const nuevoInformeInicial = await InformeInicial.bulkCreate(informeInicial);

  res.status(201).json(nuevoInformeInicial);
};

export const updateInformesIniciales = async (req: Request, res: Response) => {
  const {
    id_informe_inicial,
    titular_informe_inicial,
    fecha_informe_inicial,
    hora_informe_inicial,
    turno_informe_inicial,
    bob_cat_informe_inicial,
    molino_informe_inicial,
    referencia_informe_inicial,
    bulto_informe_inicial,
    horometro_informe_inicial,
    operador_informe_inicial,
    carguero_informe_inicial,
    mecanico_informe_inicial,
    cdc_informe_inicial,
    observacion_informe_inicial,
    actividad_informe_inicial,
  } = req.body;

  const informeInicial = await InformeInicial.findByPk(id_informe_inicial);

  if (!informeInicial)
    return res.status(404).json({ message: "Informe inicial no encontrado" });

  informeInicial.set({
    titular_informe_inicial,
    fecha_informe_inicial,
    hora_informe_inicial,
    turno_informe_inicial,
    bob_cat_informe_inicial,
    molino_informe_inicial,
    referencia_informe_inicial,
    bulto_informe_inicial,
    horometro_informe_inicial,
    operador_informe_inicial,
    carguero_informe_inicial,
    mecanico_informe_inicial,
    cdc_informe_inicial,
    observacion_informe_inicial,
    actividad_informe_inicial,
  });

  await informeInicial.save();

  res.json(informeInicial);
};

export const deleteInformesIniciales = async (req: Request, res: Response) => {
  const { id_informe_inicial } = req.body;

  const informeInicial = await InformeInicial.findByPk(id_informe_inicial);

  if (!informeInicial)
    return res.status(404).json({ message: "Informe inicial no encontrado" });

  await informeInicial.destroy();

  res.json({
    message: `Informe inicial con id ${id_informe_inicial} eliminado`,
  });
};
