import { DataTypes } from "sequelize";

import { sequelize } from "../config/database.js";

import Usuarios from "./Usuarios.js";

const Registros = sequelize.define(
  "registros",
  {
    id_registro: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    fecha_registro: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora_registro: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    mes_registro: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    titular_registro: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id_usuario",
      },
    },
    remision_registro: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    nombre_proveedor_registro: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    documento_proveedor_registro: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    nombre_transportador_registro: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    documento_transportador_registro: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    tipo_registro: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    mp_registro: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    valor_mp_registro: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    peso_mp_registro: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    concepto_registro: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    zona_registro: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    bonificacion_registro: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    valor_t_registro: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    observacion_registro: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      defaultValue: "No se registró",
    },
    actividad_registro: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    actualizacion_registro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "registros",
    timestamps: false,
  },
);

Registros.belongsTo(Usuarios, {
  foreignKey: "titular_registro",
  targetKey: "id_usuario",
  as: "titular",
});

export default Registros;
