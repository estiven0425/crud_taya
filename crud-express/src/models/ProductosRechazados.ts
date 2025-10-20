import { DataTypes } from "sequelize";

import { sequelize } from "../config/database.js";

const ProductosRechazados = sequelize.define(
  "productos_rechazados",
  {
    id_producto_rechazado: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nombre_producto_rechazado: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    cantidad_producto_rechazado: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    retencion_producto_rechazado: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    actividad_producto_rechazado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    actualizacion_producto_rechazado: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "productos_rechazados",
    timestamps: false,
  },
);

export default ProductosRechazados;
