import { Request, Response } from "express";
import Novedad from "../models/Novedad.js";
import Usuarios from "../models/Usuarios.js";

export const getNovedades = async (_req: Request, res: Response) => {
  const novedades = await Novedad.findAll({
    include: [
      {
        model: Usuarios,
        attributes: ["nombre_usuario"],
        as: "operador",
        foreignKey: "operador_novedad",
      },
      {
        model: Usuarios,
        attributes: ["nombre_usuario"],
        as: "carguero",
        foreignKey: "carguero_novedad",
      },
      {
        model: Usuarios,
        attributes: ["nombre_usuario"],
        as: "mecanico",
        foreignKey: "mecanico_novedad",
      },
    ],
    where: { actividad_novedad: true },
  });

  res.json(novedades);
};

export const createNovedad = async (req: Request, res: Response) => {
  const item = req.body;

  const nuevaNovedad = await Novedad.create(item);

  res.status(201).json(nuevaNovedad);
};

export const createFormNovedad = async (req: Request, res: Response) => {
  const novedad = req.body;

  const nuevaNovedad = await Novedad.bulkCreate(novedad);

  res.status(201).json(nuevaNovedad);
};

export const updateNovedades = async (req: Request, res: Response) => {
  const {
    id_novedad,
    fecha_novedad,
    fecha_auxiliar_novedad,
    hora_novedad,
    turno_novedad,
    tipo_novedad,
    molino_novedad,
    referencia_novedad,
    bulto_novedad,
    operador_novedad,
    bob_cat_novedad,
    carguero_novedad,
    mecanico_novedad,
    inicio_paro_novedad,
    fin_paro_novedad,
    horometro_inicio_paro_novedad,
    horometro_fin_paro_novedad,
    motivo_paro_novedad,
    observacion_novedad,
    actividad_novedad,
  } = req.body;

  const novedad = await Novedad.findByPk(id_novedad);

  if (!novedad)
    return res.status(404).json({ message: "Novedad no encontrada" });

  novedad.set({
    fecha_novedad,
    fecha_auxiliar_novedad,
    hora_novedad,
    turno_novedad,
    tipo_novedad,
    molino_novedad,
    referencia_novedad,
    bulto_novedad,
    operador_novedad,
    bob_cat_novedad,
    carguero_novedad,
    mecanico_novedad,
    inicio_paro_novedad,
    fin_paro_novedad,
    horometro_inicio_paro_novedad,
    horometro_fin_paro_novedad,
    motivo_paro_novedad,
    observacion_novedad,
    actividad_novedad,
  });

  await novedad.save();

  res.json(novedad);
};

export const deleteNovedades = async (req: Request, res: Response) => {
  const { id_novedad } = req.body;

  const novedad = await Novedad.findByPk(id_novedad);

  if (!novedad)
    return res.status(404).json({ message: "Novedad no encontrada" });

  await novedad.destroy();

  res.json({
    message: `Novedad con id ${id_novedad} eliminada`,
  });
};
