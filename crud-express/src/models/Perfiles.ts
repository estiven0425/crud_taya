import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const Perfiles = sequelize.define(
  "perfiles",
  {
    id_perfil: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nombre_perfil: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    icono_perfil: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: "uploads/icono_predeterminado.svg",
    },
    actividad_perfil: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    actualizacion_perfil: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "perfiles",
    timestamps: false,
  },
);

export default Perfiles;
