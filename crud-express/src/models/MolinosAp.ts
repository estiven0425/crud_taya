import { DataTypes } from "sequelize";

import { sequelize } from "../config/database.js";

const MolinosAp = sequelize.define(
  "molinos_ap",
  {
    id_molino_ap: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nombre_molino_ap: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    horometro_molino_ap: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    actividad_molino_ap: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    actualizacion_molino_ap: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "molinos_ap",
    timestamps: false,
  },
);

export default MolinosAp;
