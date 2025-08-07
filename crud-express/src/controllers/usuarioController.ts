import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Usuarios from "../models/Usuarios.js";
import Perfiles from "../models/Perfiles.js";

export const getUsuarios = async (_req: Request, res: Response) => {
  const usuarios = await Usuarios.findAll({
    include: [
      {
        model: Perfiles,
        attributes: ["nombre_perfil"],
        as: "perfil",
        foreignKey: "perfil_usuario",
      },
    ],
    where: { actividad_usuario: true },
  });

  res.json(usuarios);
};

export const createUsuario = async (req: Request, res: Response) => {
  const {
    nombre_usuario,
    documento_usuario,
    telefono_usuario,
    correo_usuario,
    contrato_usuario,
    perfil_usuario,
    contrasena_usuario,
  } = req.body;

  const password = await bcrypt.hash(contrasena_usuario, 10);

  const nuevoUsuario = await Usuarios.create({
    nombre_usuario,
    documento_usuario,
    telefono_usuario,
    correo_usuario,
    contrato_usuario,
    perfil_usuario,
    contrasena_usuario: password,
  });

  res.status(201).json(nuevoUsuario);
};

export const updateUsuarios = async (req: Request, res: Response) => {
  const {
    id_usuario,
    nombre_usuario,
    documento_usuario,
    telefono_usuario,
    correo_usuario,
    contrato_usuario,
    perfil_usuario,
    contrasena_usuario,
    actividad_usuario,
  } = req.body;

  const usuario = await Usuarios.findByPk(id_usuario);

  if (!usuario)
    return res.status(404).json({ message: "Usuario no encontrado" });

  let password = contrasena_usuario;

  if (contrasena_usuario && contrasena_usuario.trim() !== "") {
    password = await bcrypt.hash(contrasena_usuario, 10);
  }

  usuario.set({
    nombre_usuario,
    documento_usuario,
    telefono_usuario,
    correo_usuario,
    contrato_usuario,
    perfil_usuario,
    contrasena_usuario: password,
    actividad_usuario,
  });

  await usuario.save();

  res.json(usuario);
};

export const deleteUsuarios = async (req: Request, res: Response) => {
  const { id_usuario } = req.body;

  const usuario = await Usuarios.findByPk(id_usuario);

  if (!usuario)
    return res.status(404).json({ message: "Usuario no encontrado" });

  await usuario.destroy();

  res.json({
    message: `Usuario con id ${id_usuario} eliminado`,
  });
};
