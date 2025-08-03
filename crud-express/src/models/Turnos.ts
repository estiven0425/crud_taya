import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Turnos = sequelize.define(
  "turnos",
  {
    id_turno: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nombre_turno: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    inicio_turno: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    fin_turno: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    actividad_turno: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    actualizacion_turno: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "turnos",
    timestamps: false,
  },
);

export default Turnos;
