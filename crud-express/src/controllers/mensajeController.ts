import { Request, Response } from "express";
import Mensajes from "../models/Mensajes.js";
import Usuarios from "../models/Usuarios.js";

export const getMensajes = async (_req: Request, res: Response) => {
  const mensajes = await Mensajes.findAll({
    include: [
      {
        model: Usuarios,
        attributes: ["nombre_usuario"],
        as: "emisor",
        foreignKey: "emisor_mensaje",
      },
      {
        model: Usuarios,
        attributes: ["nombre_usuario"],
        as: "receptor",
        foreignKey: "receptor_mensaje",
      },
    ],
  });

  res.json(mensajes);
};

export const createMensaje = async (req: Request, res: Response) => {
  const item = req.body;

  const nuevoMensaje = await Mensajes.create(item);

  res.status(201).json(nuevoMensaje);
};

export const updateMensajes = async (req: Request, res: Response) => {
  const {
    id_mensaje,
    fecha_mensaje,
    hora_mensaje,
    texto_mensaje,
    emisor_mensaje,
    receptor_mensaje,
  } = req.body;

  const mensaje = await Mensajes.findByPk(id_mensaje);

  if (!mensaje)
    return res.status(404).json({ message: "Mensaje no encontrado" });

  mensaje.set({
    fecha_mensaje,
    hora_mensaje,
    texto_mensaje,
    emisor_mensaje,
    receptor_mensaje,
  });

  await mensaje.save();

  res.json(mensaje);
};

export const deleteMensajes = async (req: Request, res: Response) => {
  const { id_mensaje } = req.body;

  const mensaje = await Mensajes.findByPk(id_mensaje);

  if (!mensaje)
    return res.status(404).json({ message: "Mensaje no encontrado" });

  await mensaje.destroy();

  res.json({
    message: `Mensaje con id ${id_mensaje} eliminado`,
  });
};
