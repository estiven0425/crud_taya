import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Despachos = sequelize.define(
  "despachos",
  {
    id_despacho: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    fecha_despacho: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    cantidad_despacho: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    actividad_despacho: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    actualizacion_despacho: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "despachos",
    timestamps: false,
  },
);

export default Despachos;
