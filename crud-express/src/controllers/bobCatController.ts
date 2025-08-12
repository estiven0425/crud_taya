import { Request, Response } from "express";
import BobCats from "../models/BobCats.js";

export const getBobCats = async (_req: Request, res: Response) => {
  const bobCats = await BobCats.findAll({
    where: { actividad_bob_cat: true },
  });

  res.json(bobCats);
};

export const createBobCats = async (req: Request, res: Response) => {
  const item = req.body;

  const nuevoBobCat = await BobCats.create(item);

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

export const deleteBobCats = async (req: Request, res: Response) => {
  const { id_bob_cat } = req.body;

  const bobCat = await BobCats.findByPk(id_bob_cat);

  if (!bobCat)
    return res.status(404).json({ message: "Bob Cat no encontrado" });

  await bobCat.destroy();

  res.json({ message: `Bob Cat con id ${id_bob_cat} eliminado` });
};
