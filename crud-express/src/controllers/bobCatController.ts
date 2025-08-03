import { Request, Response } from "express";
import BobCats from "../models/BobCats";

export const getBobCats = async (_req: Request, res: Response) => {
  const bobCats = await BobCats.findAll({
    where: { actividad_bob_cat: true },
  });

  res.json(bobCats);
};

export const createBobCats = async (req: Request, res: Response) => {
  const { nombre_bob_cat } = req.body;

  const nuevoBobCat = await BobCats.create({
    nombre_bob_cat,
  });

  res.status(201).json(nuevoBobCat);
};

export const updateBobCats = async (req: Request, res: Response) => {
  const { id_bob_cat, nombre_bob_cat, actividad_bob_cat } = req.body;

  const bobCat = await BobCats.findByPk(id_bob_cat);

  if (!bobCat)
    return res.status(404).json({ message: "Bob Cat no encontrado" });

  bobCat.set({ nombre_bob_cat, actividad_bob_cat });

  await bobCat.save();

  res.json(bobCat);
};
