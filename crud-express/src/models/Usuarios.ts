import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Perfiles from "./Perfiles.js";

const Usuarios = sequelize.define(
  "usuarios",
  {
    id_usuario: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nombre_usuario: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    documento_usuario: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    telefono_usuario: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    correo_usuario: {
      type: DataTypes.STRING(250),
      allowNull: true,
      defaultValue: "No aplica",
    },
    contrato_usuario: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    perfil_usuario: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "perfiles",
        key: "id_perfil",
      },
    },
    contrasena_usuario: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    actividad_usuario: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    actualizacion_usuario: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  },
);

Usuarios.belongsTo(Perfiles, {
  foreignKey: "perfil_usuario",
  targetKey: "id_perfil",
  as: "perfil",
});

export default Usuarios;
