import { Request, Response } from "express";
import PresupuestoComercial from "../models/PresupuestoComercial.js";

export const getPresupuestosComerciales = async (
  _req: Request,
  res: Response,
) => {
  const presupuestosComerciales = await PresupuestoComercial.findAll({
    where: { actividad_presupuesto_comercial: true },
  });

  res.json(presupuestosComerciales);
};

export const createPresupuestoComercial = async (
  req: Request,
  res: Response,
) => {
  const { fecha_presupuesto_comercial, capacidad_presupuesto_comercial } =
    req.body;

  const nuevoPresupuestoComercial = await PresupuestoComercial.create({
    fecha_presupuesto_comercial,
    capacidad_presupuesto_comercial,
  });

  res.status(201).json(nuevoPresupuestoComercial);
};

export const updatePresupuestosComerciales = async (
  req: Request,
  res: Response,
) => {
  const {
    id_presupuesto_comercial,
    fecha_presupuesto_comercial,
    capacidad_presupuesto_comercial,
    actividad_presupuesto_comercial,
  } = req.body;

  const presupuestoComercial = await PresupuestoComercial.findByPk(
    id_presupuesto_comercial,
  );

  if (!presupuestoComercial)
    return res
      .status(404)
      .json({ message: "Presupuesto comercial no encontrado" });

  presupuestoComercial.set({
    fecha_presupuesto_comercial,
    capacidad_presupuesto_comercial,
    actividad_presupuesto_comercial,
  });

  await presupuestoComercial.save();

  res.json(presupuestoComercial);
};

export const deletePresupuestosComerciales = async (
  req: Request,
  res: Response,
) => {
  const { id_presupuesto_comercial } = req.body;

  const presupuestoComercial = await PresupuestoComercial.findByPk(
    id_presupuesto_comercial,
  );

  if (!presupuestoComercial)
    return res
      .status(404)
      .json({ message: "Presupuesto comercial no encontrado" });

  await presupuestoComercial.destroy();

  res.json({
    message: `Presupuesto comercial con id ${id_presupuesto_comercial} eliminado`,
  });
};
