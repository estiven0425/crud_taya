import { Request, Response } from "express";
import Registros from "../models/Registros.js";
import Usuarios from "../models/Usuarios.js";

export const getRegistros = async (_req: Request, res: Response) => {
  const registros = await Registros.findAll({
    include: [
      {
        model: Usuarios,
        attributes: ["nombre_usuario"],
        as: "titular",
        foreignKey: "titular_registro",
      },
    ],
    where: { actividad_registro: true },
  });

  res.json(registros);
};

export const createRegistro = async (req: Request, res: Response) => {
  const item = req.body;

  const nuevoRegistro = await Registros.create(item);

  res.status(201).json(nuevoRegistro);
};

export const updateRegistros = async (req: Request, res: Response) => {
  const {
    id_registro,
    fecha_registro,
    hora_registro,
    mes_registro,
    titular_registro,
    remision_registro,
    nombre_proveedor_registro,
    documento_proveedor_registro,
    nombre_transportador_registro,
    documento_transportador_registro,
    tipo_registro,
    mp_registro,
    valor_mp_registro,
    peso_mp_registro,
    concepto_registro,
    zona_registro,
    bonificacion_registro,
    valor_t_registro,
    observacion_registro,
    actividad_registro,
  } = req.body;

  const registro = await Registros.findByPk(id_registro);

  if (!registro)
    return res.status(404).json({ message: "Registro no encontrado" });

  registro.set({
    fecha_registro,
    hora_registro,
    mes_registro,
    titular_registro,
    remision_registro,
    nombre_proveedor_registro,
    documento_proveedor_registro,
    nombre_transportador_registro,
    documento_transportador_registro,
    tipo_registro,
    mp_registro,
    valor_mp_registro,
    peso_mp_registro,
    concepto_registro,
    zona_registro,
    bonificacion_registro,
    valor_t_registro,
    observacion_registro,
    actividad_registro,
  });

  await registro.save();

  res.json(registro);
};

export const deleteRegistros = async (req: Request, res: Response) => {
  const { id_registro } = req.body;

  const registro = await Registros.findByPk(id_registro);

  if (!registro)
    return res.status(404).json({ message: "Registro no encontrado" });

  await registro.destroy();

  res.json({
    message: `Registro con id ${id_registro} eliminado`,
  });
};
