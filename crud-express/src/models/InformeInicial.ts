import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import Usuarios from "./Usuarios";

const InformeInicial = sequelize.define(
  "informe_inicial",
  {
    id_informe_inicial: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    titular_informe_inicial: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id_usuario",
      },
    },
    fecha_informe_inicial: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora_informe_inicial: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    turno_informe_inicial: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    bob_cat_informe_inicial: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    molino_informe_inicial: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    referencia_informe_inicial: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    bulto_informe_inicial: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    horometro_informe_inicial: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    operador_informe_inicial: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "usuarios",
        key: "id_usuario",
      },
    },
    carguero_informe_inicial: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "usuarios",
        key: "id_usuario",
      },
    },
    mecanico_informe_inicial: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "usuarios",
        key: "id_usuario",
      },
    },
    cdc_informe_inicial: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "usuarios",
        key: "id_usuario",
      },
    },
    observacion_informe_inicial: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      defaultValue: "No se registró",
    },
    actividad_informe_inicial: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    actualizacion_informe_inicial: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "informe_inicial",
    timestamps: false,
  },
);

InformeInicial.belongsTo(Usuarios, {
  foreignKey: "titular_informe_inicial",
  targetKey: "id_usuario",
  as: "titular",
});
InformeInicial.belongsTo(Usuarios, {
  foreignKey: "operador_informe_inicial",
  targetKey: "id_usuario",
  as: "operador",
});
InformeInicial.belongsTo(Usuarios, {
  foreignKey: "carguero_informe_inicial",
  targetKey: "id_usuario",
  as: "carguero",
});
InformeInicial.belongsTo(Usuarios, {
  foreignKey: "mecanico_informe_inicial",
  targetKey: "id_usuario",
  as: "mecanico",
});
InformeInicial.belongsTo(Usuarios, {
  foreignKey: "cdc_informe_inicial",
  targetKey: "id_usuario",
  as: "cdc",
});

export default InformeInicial;
