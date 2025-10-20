import { DataTypes } from "sequelize";

import { sequelize } from "../config/database.js";

const ControlCalidad = sequelize.define(
  "control_calidad",
  {
    id_control_calidad: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    fecha_control_calidad: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora_control_calidad: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    turno_control_calidad: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    molino_control_calidad: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    referencia_control_calidad: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    bulto_control_calidad: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    retencion_control_calidad: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    rechazado_control_calidad: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    observacion_control_calidad: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      defaultValue: "No se registró",
    },
    actividad_control_calidad: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    actualizacion_control_calidad: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "control_calidad",
    timestamps: false,
  },
);

export default ControlCalidad;
