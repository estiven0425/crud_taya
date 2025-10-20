import { Request, Response } from "express";

import ProductosRechazados from "../models/ProductosRechazados.js";

export const getProductosRechazados = async (_req: Request, res: Response) => {
  const productosRechazados = await ProductosRechazados.findAll({
    where: { actividad_producto_rechazado: true },
  });

  res.json(productosRechazados);
};

export const createProductoRechazado = async (req: Request, res: Response) => {
  const item = req.body;

  try {
    const productoExistente = (await ProductosRechazados.findOne({
      where: {
        nombre_producto_rechazado: item.nombre_producto_rechazado,
        retencion_producto_rechazado: item.retencion_producto_rechazado,
        actividad_producto_rechazado: true,
      },
    })) as any;

    let nuevoProductoRechazado;

    if (productoExistente) {
      const cantidadActual =
        parseFloat(productoExistente.cantidad_producto_rechazado) || 0;

      const cantidadNueva = parseFloat(item.cantidad_producto_rechazado) || 0;

      productoExistente.cantidad_producto_rechazado =
        cantidadActual + cantidadNueva;

      await productoExistente.save();

      nuevoProductoRechazado = productoExistente;
    } else {
      nuevoProductoRechazado = await ProductosRechazados.create({
        nombre_producto_rechazado: item.nombre_producto_rechazado,
        cantidad_producto_rechazado: item.cantidad_producto_rechazado,
        retencion_producto_rechazado: item.retencion_producto_rechazado,
      });
    }

    res.status(201).json(nuevoProductoRechazado);
  } catch (error) {
    console.error("Error al buscar el producto existente:", error);
  }
};

export const updateProductosRechazados = async (
  req: Request,
  res: Response,
) => {
  const {
    id_producto_rechazado,
    nombre_producto_rechazado,
    cantidad_producto_rechazado,
    retencion_producto_rechazado,
    actividad_producto_rechazado,
  } = req.body;

  const productoRechazado = await ProductosRechazados.findByPk(
    id_producto_rechazado,
  );

  if (!productoRechazado)
    return res
      .status(404)
      .json({ message: "Producto rechazado no encontrado" });

  productoRechazado.set({
    nombre_producto_rechazado,
    cantidad_producto_rechazado,
    retencion_producto_rechazado,
    actividad_producto_rechazado,
  });

  await productoRechazado.save();

  res.json(productoRechazado);
};

export const deleteProductosRechazados = async (
  req: Request,
  res: Response,
) => {
  const { id_producto_rechazado } = req.body;

  const productoRechazado = await ProductosRechazados.findByPk(
    id_producto_rechazado,
  );

  if (!productoRechazado)
    return res
      .status(404)
      .json({ message: "Producto rechazado no encontrado" });

  await productoRechazado.destroy();

  res.json({
    message: `Producto rechazado con id ${id_producto_rechazado} eliminado`,
  });
};
