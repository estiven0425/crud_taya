import { DataTypes } from "sequelize";

import { sequelize } from "../config/database.js";

import Usuarios from "./Usuarios.js";

const Mensajes = sequelize.define(
  "mensajes",
  {
    id_mensaje: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    fecha_mensaje: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora_mensaje: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    texto_mensaje: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    emisor_mensaje: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id_usuario",
      },
    },
    receptor_mensaje: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id_usuario",
      },
    },
    actualizacion_mensaje: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "mensajes",
    timestamps: false,
  },
);

Mensajes.belongsTo(Usuarios, {
  foreignKey: "emisor_mensaje",
  targetKey: "id_usuario",
  as: "emisor",
});
Mensajes.belongsTo(Usuarios, {
  foreignKey: "receptor_mensaje",
  targetKey: "id_usuario",
  as: "receptor",
});

export default Mensajes;
