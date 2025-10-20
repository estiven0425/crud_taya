import { DataTypes } from "sequelize";

import { sequelize } from "../config/database.js";

const MateriasPrimas = sequelize.define(
  "materias_primas",
  {
    id_materia_prima: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nombre_materia_prima: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    cantidad_materia_prima: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    actividad_materia_prima: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    actualizacion_materia_prima: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "materias_primas",
    timestamps: false,
  },
);

export default MateriasPrimas;
