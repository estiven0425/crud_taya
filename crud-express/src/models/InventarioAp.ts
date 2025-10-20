import { DataTypes } from "sequelize";

import { sequelize } from "../config/database.js";

const InventarioAp = sequelize.define(
  "inventario_ap",
  {
    id_inventario_ap: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    tipo_inventario_ap: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    nombre_inventario_ap: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    porcentaje_inventario_ap: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    total_inventario_ap: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    actividad_inventario_ap: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    actualizacion_inventario_ap: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "inventario_ap",
    timestamps: false,
  },
);

export default InventarioAp;
