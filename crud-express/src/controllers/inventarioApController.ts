import { Request, Response } from "express";
import InventarioAp from "../models/InventarioAp.js";

export const getInventarioAp = async (_req: Request, res: Response) => {
  const inventarioAp = await InventarioAp.findAll({
    where: { actividad_inventario_ap: true },
  });

  res.json(inventarioAp);
};

export const createInventarioAp = async (req: Request, res: Response) => {
  const {
    tipo_inventario_ap,
    nombre_inventario_ap,
    porcentaje_inventario_ap,
    total_inventario_ap,
  } = req.body;

  const nuevoInventarioAp = await InventarioAp.create({
    tipo_inventario_ap,
    nombre_inventario_ap,
    porcentaje_inventario_ap,
    total_inventario_ap,
  });

  res.status(201).json(nuevoInventarioAp);
};

export const updateInventarioAp = async (req: Request, res: Response) => {
  const {
    id_inventario_ap,
    tipo_inventario_ap,
    nombre_inventario_ap,
    porcentaje_inventario_ap,
    total_inventario_ap,
    actividad_inventario_ap,
  } = req.body;

  const inventarioAp = await InventarioAp.findByPk(id_inventario_ap);

  if (!inventarioAp)
    return res.status(404).json({ message: "Inventario AP no encontrado" });

  inventarioAp.set({
    tipo_inventario_ap,
    nombre_inventario_ap,
    porcentaje_inventario_ap,
    total_inventario_ap,
    actividad_inventario_ap,
  });

  await inventarioAp.save();

  res.json(inventarioAp);
};

export const deleteInventarioAp = async (req: Request, res: Response) => {
  const { id_inventario_ap } = req.body;

  const inventarioAp = await InventarioAp.findByPk(id_inventario_ap);

  if (!inventarioAp)
    return res.status(404).json({ message: "Inventario AP no encontrado" });

  await inventarioAp.destroy();

  res.json({
    message: `Inventario AP con id ${id_inventario_ap} eliminado`,
  });
};
