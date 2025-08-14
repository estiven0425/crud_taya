import { Request, Response } from "express";
import Referencias from "../models/Referencias.js";

export const getReferencias = async (_req: Request, res: Response) => {
  const referencias = await Referencias.findAll({
    where: { actividad_referencia: true },
  });

  res.json(referencias);
};

export const createReferencia = async (req: Request, res: Response) => {
  const item = req.body;

  const nuevaReferencia = await Referencias.create(item);

  res.status(201).json(nuevaReferencia);
};

export const updateReferencias = async (req: Request, res: Response) => {
  const {
    id_referencia,
    nombre_referencia,
    cantidad_referencia,
    cliente_referencia,
    actividad_referencia,
  } = req.body;

  const referencia = await Referencias.findByPk(id_referencia);

  if (!referencia)
    return res.status(404).json({ message: "Referencia no encontrada" });

  referencia.set({
    nombre_referencia,
    cantidad_referencia,
    cliente_referencia,
    actividad_referencia,
  });

  await referencia.save();

  res.json(referencia);
};

export const updateAmountReferencias = async (req: Request, res: Response) => {
  const actualizaciones = req.body as {
    id_referencia: number;
    cantidad_referencia: number | string;
  }[];

  try {
    const resultados = await Promise.all(
      actualizaciones.map(async ({ id_referencia, cantidad_referencia }) => {
        const referenciaExistente = await Referencias.findByPk(id_referencia);

        if (referenciaExistente) {
          const cantidadActual =
            parseFloat((referenciaExistente as any).cantidad_referencia) || 0;

          const cantidadNueva = parseFloat(cantidad_referencia as string) || 0;

          (referenciaExistente as any).cantidad_referencia =
            cantidadActual + cantidadNueva;

          await referenciaExistente.save();

          return {
            id_referencia,
            mensaje: "Cantidad de referencia actualizada con éxito",
            nueva_cantidad: (referenciaExistente as any).cantidad_referencia,
          };
        } else {
          return { id_referencia, error: "Referencia no encontrada" };
        }
      }),
    );

    const errores = resultados.filter((r) => r.error);

    if (errores.length > 0) {
      return res.status(404).json({ errores });
    }

    res.json({
      mensaje: "Cantidades de referencias actualizadas con éxito",
      resultados,
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Error al actualizar las cantidades de las referencias",
      details: error.message,
    });
  }
};

export const deleteReferencias = async (req: Request, res: Response) => {
  const { id_referencia } = req.body;

  const referencia = await Referencias.findByPk(id_referencia);

  if (!referencia)
    return res.status(404).json({ message: "Referencia no encontrada" });

  await referencia.destroy();

  res.json({
    message: `Referencia con id ${id_referencia} eliminada`,
  });
};
