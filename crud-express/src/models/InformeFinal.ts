import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const InformeFinal = sequelize.define(
  "informe_final",
  {
    id_informe_final: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    fecha_informe_final: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora_informe_final: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    turno_informe_final: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    molino_informe_final: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    referencia_informe_final: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    bulto_informe_final: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    cantidad_informe_final: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    horometro_informe_final: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    observacion_informe_final: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      defaultValue: "No se registró",
    },
    actividad_informe_final: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    actualizacion_informe_final: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "informe_final",
    timestamps: false,
  },
);

export default InformeFinal;
