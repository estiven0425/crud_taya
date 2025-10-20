import { Request, Response } from "express";

import Molinos from "../models/Molinos.js";

export const getMolinos = async (_req: Request, res: Response) => {
  const molinos = await Molinos.findAll({
    where: { actividad_molino: true },
  });

  res.json(molinos);
};

export const createMolino = async (req: Request, res: Response) => {
  const item = req.body;

  const nuevoMolino = await Molinos.create(item);

  res.status(201).json(nuevoMolino);
};

export const updateMolinos = async (req: Request, res: Response) => {
  const { id_molino, nombre_molino, horometro_molino, actividad_molino } =
    req.body;

  const molino = await Molinos.findByPk(id_molino);

  if (!molino) return res.status(404).json({ message: "Molino no encontrada" });

  molino.set({
    nombre_molino,
    horometro_molino,
    actividad_molino,
  });

  await molino.save();

  res.json(molino);
};

export const updateHoursMolinos = async (req: Request, res: Response) => {
  const actualizaciones = req.body as {
    id_molino: number;
    horometro_molino: number;
  }[];

  try {
    const resultados = await Promise.all(
      actualizaciones.map(async ({ id_molino, horometro_molino }) => {
        const molino = await Molinos.findByPk(id_molino);

        if (molino) {
          await molino.update({ horometro_molino });

          return {
            id_molino,
            mensaje: "Horómetro actualizado con éxito",
          };
        } else {
          return {
            id_molino,
            error: "Molino no encontrado",
          };
        }
      }),
    );

    const errores = resultados.filter((r) => r.error);

    if (errores.length > 0) {
      return res.status(404).json({ errores });
    }

    res.json({
      mensaje: "Horómetros de molinos actualizados con éxito",
      resultados,
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Error al actualizar los horómetros de los molinos",
      details: error.message,
    });
  }
};

export const deleteMolinos = async (req: Request, res: Response) => {
  const { id_molino } = req.body;

  const molino = await Molinos.findByPk(id_molino);

  if (!molino) return res.status(404).json({ message: "Molino no encontrado" });

  await molino.destroy();

  res.json({
    message: `Molino AP con id ${id_molino} eliminado`,
  });
};
