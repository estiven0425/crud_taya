import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Molinos = sequelize.define(
  "molinos",
  {
    id_molino: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nombre_molino: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    horometro_molino: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    actividad_molino: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    actualizacion_molino: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "molinos",
    timestamps: false,
  },
);

export default Molinos;
