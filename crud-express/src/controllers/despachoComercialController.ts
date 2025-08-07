import { Request, Response } from "express";
import DespachoComercial from "../models/DespachoComercial.js";

export const getDespachosComerciales = async (_req: Request, res: Response) => {
  const despachosComerciales = await DespachoComercial.findAll({
    where: { actividad_despacho_comercial: true },
  });

  res.json(despachosComerciales);
};

export const createDespachoComercial = async (req: Request, res: Response) => {
  const { fecha_despacho_comercial, cantidad_despacho_comercial } = req.body;

  const nuevoDespachoComercial = await DespachoComercial.create({
    fecha_despacho_comercial,
    cantidad_despacho_comercial,
  });

  res.status(201).json(nuevoDespachoComercial);
};

export const updateDespachosComerciales = async (
  req: Request,
  res: Response,
) => {
  const {
    id_despacho_comercial,
    fecha_despacho_comercial,
    cantidad_despacho_comercial,
    actividad_despacho_comercial,
  } = req.body;

  const despachoComercial = await DespachoComercial.findByPk(
    id_despacho_comercial,
  );

  if (!despachoComercial)
    return res
      .status(404)
      .json({ message: "Despacho comercial no encontrado" });

  despachoComercial.set({
    fecha_despacho_comercial,
    cantidad_despacho_comercial,
    actividad_despacho_comercial,
  });

  await despachoComercial.save();

  res.json(despachoComercial);
};

export const deleteDespachosComerciales = async (
  req: Request,
  res: Response,
) => {
  const { id_despacho_comercial } = req.body;

  const despachoComercial = await DespachoComercial.findByPk(
    id_despacho_comercial,
  );

  if (!despachoComercial)
    return res
      .status(404)
      .json({ message: "Despacho comercial no encontrado" });

  await despachoComercial.destroy();

  res.json({
    message: `Despacho comercial con id ${id_despacho_comercial} eliminado`,
  });
};
