import { DataTypes } from "sequelize";

import { sequelize } from "../config/database.js";

import Usuarios from "./Usuarios.js";

const RegistrosAp = sequelize.define(
  "RegistrosAp",
  {
    id_registro_ap: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    fecha_registro_ap: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    turno_registro_ap: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    mes_registro_ap: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    titular_registro_ap: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id_usuario",
      },
    },
    operador_registro_ap: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id_usuario",
      },
    },
    ingreso_roca_registro_ap: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    bobcat_roca_registro_ap: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    ingreso_grueso_registro_ap: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    bobcat_grueso_registro_ap: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    peso_bobcat_registro_ap: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total_roca_registro_ap: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total_grueso_registro_ap: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    molino_registro_ap: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    horometro_inicio_registro_ap: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    horometro_fin_registro_ap: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    carguero_registro_ap: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id_usuario",
      },
    },
    observacion_registro_ap: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      defaultValue: "No se registró",
    },
    actividad_registro_ap: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    actualizacion_registro_ap: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "registros_ap",
    timestamps: false,
  },
);

RegistrosAp.belongsTo(Usuarios, {
  foreignKey: "titular_registro_ap",
  targetKey: "id_usuario",
  as: "titular",
});

RegistrosAp.belongsTo(Usuarios, {
  foreignKey: "operador_registro_ap",
  targetKey: "id_usuario",
  as: "operador",
});

RegistrosAp.belongsTo(Usuarios, {
  foreignKey: "carguero_registro_ap",
  targetKey: "id_usuario",
  as: "carguero",
});

export default RegistrosAp;
