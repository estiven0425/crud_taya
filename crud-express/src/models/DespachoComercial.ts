import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const DespachoComercial = sequelize.define(
  "despacho_comercial",
  {
    id_despacho_comercial: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    fecha_despacho_comercial: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    cantidad_despacho_comercial: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    actividad_despacho_comercial: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    actualizacion_despacho_comercial: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "despacho_comercial",
    timestamps: false,
  },
);

export default DespachoComercial;
