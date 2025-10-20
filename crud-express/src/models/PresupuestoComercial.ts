import { DataTypes } from "sequelize";

import { sequelize } from "../config/database.js";

const PresupuestoComercial = sequelize.define(
  "presupuesto_comercial",
  {
    id_presupuesto_comercial: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    fecha_presupuesto_comercial: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    capacidad_presupuesto_comercial: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    actividad_presupuesto_comercial: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    actualizacion_presupuesto_comercial: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "presupuesto_comercial",
    timestamps: false,
  },
);

export default PresupuestoComercial;
