import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import * as React from "react";
import Style from "../../styles/crud/crud-create-form.module.scss";

interface TableListProps {
  url: string;
  name: string;
}

interface FieldConfig {
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
}

export function CrudCreateForm({ url, name }: TableListProps) {
  const [sendStatus, setSendStatus] = useState<boolean>(false);
  const navigate = useNavigate();

  const formFieldsByTable: Record<string, FieldConfig[]> = {
    bob_cats: [
      {
        name: "nombre_bob_cat",
        type: "text",
        required: true,
        placeholder: "Nombre del Bob - Cat",
      },
    ],
    bultos: [
      {
        name: "nombre_bulto",
        type: "text",
        required: true,
        placeholder: "Nombre del bulto",
      },
      {
        name: "capacidad_bulto",
        type: "number",
        required: true,
        placeholder: "Capacidad del bulto",
      },
    ],
    controles_calidad: [
      {
        name: "fecha_control_calidad",
        type: "date",
        required: true,
        placeholder: "Fecha del control de calidad",
      },
      {
        name: "hora_control_calidad",
        type: "time",
        required: true,
        placeholder: "Hora del control de calidad",
      },
      {
        name: "turno_control_calidad",
        type: "text",
        required: true,
        placeholder: "Turno del control de calidad",
      },
      {
        name: "molino_control_calidad",
        type: "text",
        required: true,
        placeholder: "Molino del control de calidad",
      },
      {
        name: "referencia_control_calidad",
        type: "text",
        required: true,
        placeholder: "Referencia del control de calidad",
      },
      {
        name: "bulto_control_calidad",
        type: "text",
        required: true,
        placeholder: "Bulto del control de calidad",
      },
      {
        name: "retencion_control_calidad",
        type: "number",
        required: true,
        placeholder: "Retención del control de calidad (%)",
      },
      {
        name: "rechazado_control_calidad",
        type: "number",
        required: true,
        placeholder: "Cantidad rechazada en el control de calidad",
      },
      {
        name: "observacion_control_calidad",
        type: "text",
        required: false,
        placeholder: "Observación del control de calidad",
      },
    ],
    despachos_comerciales: [
      {
        name: "fecha_despacho_comercial",
        type: "date",
        required: true,
        placeholder: "Fecha del despacho comercial",
      },
      {
        name: "cantidad_despacho_comercial",
        type: "number",
        required: true,
        placeholder: "Cantidad del despacho comercial",
      },
    ],
    despachos: [
      {
        name: "fecha_despacho",
        type: "date",
        required: true,
        placeholder: "Fecha del despacho",
      },
      {
        name: "cantidad_despacho",
        type: "number",
        required: true,
        placeholder: "Cantidad del despacho",
      },
    ],
    informes_finales: [
      {
        name: "fecha_informe_final",
        type: "date",
        required: true,
        placeholder: "Fecha del informe final",
      },
      {
        name: "hora_informe_final",
        type: "time",
        required: true,
        placeholder: "Hora del informe final",
      },
      {
        name: "turno_informe_final",
        type: "text",
        required: true,
        placeholder: "Turno del informe final",
      },
      {
        name: "molino_informe_final",
        type: "text",
        required: true,
        placeholder: "Molino del informe final",
      },
      {
        name: "referencia_informe_final",
        type: "text",
        required: true,
        placeholder: "Referencia del informe final",
      },
      {
        name: "bulto_informe_final",
        type: "text",
        required: true,
        placeholder: "Bulto del informe final",
      },
      {
        name: "cantidad_informe_final",
        type: "number",
        required: true,
        placeholder: "Cantidad del informe final",
      },
      {
        name: "horometro_informe_final",
        type: "number",
        required: true,
        placeholder: "Horómetro del informe final",
      },
      {
        name: "observacion_informe_final",
        type: "text",
        required: false,
        placeholder: "Observación del informe final",
      },
    ],
    informes_iniciales: [
      {
        name: "titular_informe_inicial",
        type: "number",
        required: true,
        placeholder: "Titular del informe inicial (ID de usuario)",
      },
      {
        name: "fecha_informe_inicial",
        type: "date",
        required: true,
        placeholder: "Fecha del informe inicial",
      },
      {
        name: "hora_informe_inicial",
        type: "time",
        required: true,
        placeholder: "Hora del informe inicial",
      },
      {
        name: "turno_informe_inicial",
        type: "text",
        required: true,
        placeholder: "Turno del informe inicial",
      },
      {
        name: "bob_cat_informe_inicial",
        type: "text",
        required: false,
        placeholder: "Bob - Cat del informe inicial",
      },
      {
        name: "molino_informe_inicial",
        type: "text",
        required: false,
        placeholder: "Molino del informe inicial",
      },
      {
        name: "referencia_informe_inicial",
        type: "text",
        required: false,
        placeholder: "Referencia del informe inicial",
      },
      {
        name: "bulto_informe_inicial",
        type: "text",
        required: false,
        placeholder: "Bulto del informe inicial",
      },
      {
        name: "horometro_informe_inicial",
        type: "number",
        required: false,
        placeholder: "Horómetro del informe inicial",
      },
      {
        name: "operador_informe_inicial",
        type: "number",
        required: false,
        placeholder: "Operador del informe inicial (ID de usuario)",
      },
      {
        name: "carguero_informe_inicial",
        type: "number",
        required: false,
        placeholder: "Carguero del informe inicial (ID de usuario)",
      },
      {
        name: "mecanico_informe_inicial",
        type: "number",
        required: false,
        placeholder: "Mecánico del informe inicial (ID de usuario)",
      },
      {
        name: "cdc_informe_inicial",
        type: "number",
        required: false,
        placeholder: "Control de calidad del informe inicial (ID de usuario)",
      },
      {
        name: "observacion_informe_inicial",
        type: "text",
        required: false,
        placeholder: "Observación del informe inicial",
      },
    ],
    inventario_ap: [
      {
        name: "tipo_inventario_ap",
        type: "text",
        required: true,
        placeholder: "Tipo de inventario AP",
      },
      {
        name: "nombre_inventario_ap",
        type: "text",
        required: true,
        placeholder: "Nombre del inventario AP",
      },
      {
        name: "porcentaje_inventario_ap",
        type: "number",
        required: true,
        placeholder: "Porcentaje del inventario AP",
      },
      {
        name: "total_inventario_ap",
        type: "number",
        required: true,
        placeholder: "Total del inventario AP",
      },
    ],
    materias_primas: [
      {
        name: "nombre_materia_prima",
        type: "text",
        required: true,
        placeholder: "Nombre de la materia prima",
      },
      {
        name: "cantidad_materia_prima",
        type: "number",
        required: true,
        placeholder: "Cantidad de la materia prima",
      },
    ],
    mensajes: [
      {
        name: "fecha_mensaje",
        type: "date",
        required: true,
        placeholder: "Fecha del mensaje",
      },
      {
        name: "hora_mensaje",
        type: "time",
        required: true,
        placeholder: "Hora del mensaje",
      },
      {
        name: "texto_mensaje",
        type: "textarea",
        required: true,
        placeholder: "Texto del mensaje",
      },
      {
        name: "emisor_mensaje",
        type: "number",
        required: true,
        placeholder: "Emisor del mensaje (ID de usuario)",
      },
      {
        name: "receptor_mensaje",
        type: "number",
        required: true,
        placeholder: "Receptor del mensaje (ID de usuario)",
      },
    ],
    molinos: [
      {
        name: "nombre_molino",
        type: "text",
        required: true,
        placeholder: "Nombre del molino",
      },
      {
        name: "horometro_molino",
        type: "number",
        required: true,
        placeholder: "Horómetro del molino",
      },
    ],
    molinos_ap: [
      {
        name: "nombre_molino_ap",
        type: "text",
        required: true,
        placeholder: "Nombre del molino AP",
      },
      {
        name: "horometro_molino_ap",
        type: "number",
        required: true,
        placeholder: "Horómetro del molino AP",
      },
    ],
    novedades: [
      {
        name: "fecha_novedad",
        type: "date",
        required: true,
        placeholder: "Fecha de la novedad",
      },
      {
        name: "fecha_auxiliar_novedad",
        type: "date",
        required: true,
        placeholder: "Fecha real de la novedad",
      },
      {
        name: "hora_novedad",
        type: "time",
        required: true,
        placeholder: "Hora de la novedad",
      },
      {
        name: "turno_novedad",
        type: "text",
        required: true,
        placeholder: "Turno de la novedad",
      },
      {
        name: "tipo_novedad",
        type: "text",
        required: true,
        placeholder: "Tipo de la novedad",
      },
      {
        name: "molino_novedad",
        type: "text",
        required: false,
        placeholder: "Molino de la novedad",
      },
      {
        name: "referencia_novedad",
        type: "text",
        required: false,
        placeholder: "Referencia de la novedad",
      },
      {
        name: "bulto_novedad",
        type: "text",
        required: false,
        placeholder: "Bulto de la novedad",
      },
      {
        name: "operador_novedad",
        type: "number",
        required: false,
        placeholder: "Operador de la novedad (ID del usuario)",
      },
      {
        name: "bob_cat_novedad",
        type: "text",
        required: false,
        placeholder: "Bob - Cat de la novedad",
      },
      {
        name: "carguero_novedad",
        type: "number",
        required: false,
        placeholder: "Carguero de la novedad (ID del usuario)",
      },
      {
        name: "mecanico_novedad",
        type: "number",
        required: false,
        placeholder: "Mecánico de la novedad (ID del usuario)",
      },
      {
        name: "inicio_paro_novedad",
        type: "time",
        required: false,
        placeholder: "Hora de inicio del paro de la novedad",
      },
      {
        name: "fin_paro_novedad",
        type: "time",
        required: false,
        placeholder: "Hora de fin del paro de la novedad",
      },
      {
        name: "horometro_inicio_paro_novedad",
        type: "number",
        required: false,
        placeholder: "Horómetro al inicio del paro de la novedad",
      },
      {
        name: "horometro_fin_paro_novedad",
        type: "number",
        required: false,
        placeholder: "Horómetro al fin del paro de la novedad",
      },
      {
        name: "motivo_paro_novedad",
        type: "text",
        required: false,
        placeholder: "Motivo del paro de la novedad",
      },
      {
        name: "observacion_novedad",
        type: "text",
        required: false,
        placeholder: "Observación de la novedad",
      },
    ],
    perfiles: [
      {
        name: "nombre_perfil",
        type: "text",
        required: true,
        placeholder: "Nombre del perfil",
      },
      {
        name: "icono_perfil",
        type: "text",
        required: true,
        placeholder: "Ícono del perfil",
      },
    ],
    presupuestos_comerciales: [
      {
        name: "fecha_presupuesto_comercial",
        type: "number",
        required: true,
        placeholder: "Fecha del presupuesto comercial (Año)",
      },
      {
        name: "capacidad_presupuesto_comercial",
        type: "number",
        required: true,
        placeholder: "Capacidad del presupuesto comercial",
      },
    ],
    productos_rechazados: [
      {
        name: "nombre_producto_rechazado",
        type: "text",
        required: true,
        placeholder: "Nombre del producto rechazado",
      },
      {
        name: "cantidad_producto_rechazado",
        type: "number",
        required: true,
        placeholder: "Cantidad del producto rechazado",
      },
      {
        name: "retencion_producto_rechazado",
        type: "number",
        required: true,
        placeholder: "Retención del producto rechazado",
      },
    ],
    referencias: [
      {
        name: "nombre_referencia",
        type: "text",
        required: true,
        placeholder: "Nombre de la referencia",
      },
      {
        name: "cantidad_referencia",
        type: "number",
        required: true,
        placeholder: "Cantidad de la referencia",
      },
      {
        name: "cliente_referencia",
        type: "text",
        required: false,
        placeholder: "Cliente de la referencia",
      },
    ],
    registros: [
      {
        name: "fecha_registro",
        type: "date",
        required: true,
        placeholder: "Fecha del registro",
      },
      {
        name: "hora_registro",
        type: "time",
        required: false,
        placeholder: "Hora del registro",
      },
      {
        name: "mes_registro",
        type: "number",
        required: true,
        placeholder: "Mes del registro",
      },
      {
        name: "titular_registro",
        type: "number",
        required: true,
        placeholder: "Titular del registro (ID del usuario)",
      },
      {
        name: "remision_registro",
        type: "number",
        required: true,
        placeholder: "Remisión del registro",
      },
      {
        name: "nombre_proveedor_registro",
        type: "text",
        required: true,
        placeholder: "Nombre del proveedor del registro",
      },
      {
        name: "documento_proveedor_registro",
        type: "number",
        required: true,
        placeholder: "Documento del proveedor del registro",
      },
      {
        name: "nombre_transportador_registro",
        type: "text",
        required: true,
        placeholder: "Nombre del transportista del registro",
      },
      {
        name: "documento_transportador_registro",
        type: "number",
        required: true,
        placeholder: "Documento del transportista del registro",
      },
      {
        name: "tipo_registro",
        type: "text",
        required: true,
        placeholder: "Tipo del registro",
      },
      {
        name: "mp_registro",
        type: "text",
        required: true,
        placeholder: "Materia prima del registro",
      },
      {
        name: "valor_mp_registro",
        type: "number",
        required: true,
        placeholder: "Valor de la materia prima del registro",
      },
      {
        name: "peso_mp_registro",
        type: "number",
        required: true,
        placeholder: "Peso de la materia prima del registro",
      },
      {
        name: "concepto_registro",
        type: "number",
        required: true,
        placeholder: "Concepto del registro",
      },
      {
        name: "zona_registro",
        type: "text",
        required: true,
        placeholder: "Zona del registro",
      },
      {
        name: "bonificacion_registro",
        type: "number",
        required: true,
        placeholder: "Bonificación del registro",
      },
      {
        name: "valor_t_registro",
        type: "number",
        required: false,
        placeholder: "Valor de transporte del registro",
      },
      {
        name: "observacion_registro",
        type: "text",
        required: false,
        placeholder: "Observación del registro",
      },
    ],
    registros_ap: [
      {
        name: "fecha_registro_ap",
        type: "date",
        required: true,
        placeholder: "Fecha del registro AP",
      },
      {
        name: "turno_registro_ap",
        type: "text",
        required: true,
        placeholder: "Turno del registro AP",
      },
      {
        name: "mes_registro_ap",
        type: "number",
        required: true,
        placeholder: "Mes del registro AP",
      },
      {
        name: "titular_registro_ap",
        type: "number",
        required: true,
        placeholder: "Titular del registro AP (ID del usuario)",
      },
      {
        name: "operador_registro_ap",
        type: "number",
        required: true,
        placeholder: "Operador del registro AP (ID del usuario)",
      },
      {
        name: "ingreso_roca_registro_ap",
        type: "number",
        required: true,
        placeholder: "Ingreso de roca del registro AP",
      },
      {
        name: "bobcat_roca_registro_ap",
        type: "number",
        required: true,
        placeholder: "Cargas del Bob - Cat de roca del registro AP",
      },
      {
        name: "ingreso_grueso_registro_ap",
        type: "number",
        required: true,
        placeholder: "Ingreso de grueso del registro AP",
      },
      {
        name: "bobcat_grueso_registro_ap",
        type: "number",
        required: true,
        placeholder: "Cargas del Bob - Cat de grueso del registro AP",
      },
      {
        name: "peso_bobcat_registro_ap",
        type: "number",
        required: true,
        placeholder: "Peso del Bob - Cat del registro AP",
      },
      {
        name: "total_roca_registro_ap",
        type: "number",
        required: true,
        placeholder: "Total de roca del registro AP",
      },
      {
        name: "total_grueso_registro_ap",
        type: "number",
        required: true,
        placeholder: "Total de grueso del registro AP",
      },
      {
        name: "molino_registro_ap",
        type: "text",
        required: true,
        placeholder: "Molino del registro AP",
      },
      {
        name: "horometro_inicio_registro_ap",
        type: "number",
        required: true,
        placeholder: "Horómetro de inicio del molino del registro AP",
      },
      {
        name: "horometro_fin_registro_ap",
        type: "number",
        required: true,
        placeholder: "Horómetro de fin del molino del registro AP",
      },
      {
        name: "carguero_registro_ap",
        type: "number",
        required: true,
        placeholder: "Carguero del registro AP (ID del usuario)",
      },
      {
        name: "observacion_registro_ap",
        type: "textarea",
        required: false,
        placeholder: "Observación del registro AP",
      },
    ],
    turnos: [
      {
        name: "nombre_turno",
        type: "text",
        required: true,
        placeholder: "Nombre del turno",
      },
      {
        name: "inicio_turno",
        type: "time",
        required: true,
        placeholder: "Inicio del turno",
      },
      {
        name: "fin_turno",
        type: "time",
        required: true,
        placeholder: "Fin del turno",
      },
    ],
    usuarios: [
      {
        name: "nombre_usuario",
        type: "text",
        required: true,
        placeholder: "Nombre del usuario",
      },
      {
        name: "documento_usuario",
        type: "number",
        required: true,
        placeholder: "Documento del usuario",
      },
      {
        name: "telefono_usuario",
        type: "number",
        required: true,
        placeholder: "Teléfono del usuario",
      },
      {
        name: "correo_usuario",
        type: "email",
        required: true,
        placeholder: "Correo del usuario",
      },
      {
        name: "contrato_usuario",
        type: "number",
        required: true,
        placeholder: "Contrato del usuario",
      },
      {
        name: "perfil_usuario",
        type: "number",
        required: true,
        placeholder: "Perfil del usuario (ID del perfil)",
      },
      {
        name: "contrasena_usuario",
        type: "text",
        required: true,
        placeholder: "Contraseña del usuario",
      },
    ],
  };

  const fields = formFieldsByTable[url] || [];

  const [data, setData] = useState<Record<string, string>>(
    Object.fromEntries(fields.map(({ name }) => [name, ""])),
  );

  const apiUrl: string = import.meta.env.VITE_API_URL;

  const handleChange = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(`${apiUrl}/${url}`, data);

      setSendStatus(true);

      setTimeout(() => {
        navigate("/crud/table", { state: { url: url, name: name } });
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {sendStatus ? (
        <section className={Style.crudCreateFormAlternative} role="status">
          <h2>Registro creado con éxito</h2>
        </section>
      ) : (
        <form className={Style.crudCreateForm} onSubmit={handleSubmit}>
          {fields.map(({ name, type, required, placeholder }) => (
            <fieldset key={name}>
              <label htmlFor={name}>{name}</label>
              <input
                aria-invalid={required && !data[name] ? "true" : "false"}
                aria-required={required}
                autoComplete="off"
                id={name}
                name={name}
                onChange={(e) => handleChange(name, e.target.value)}
                placeholder={placeholder}
                required={required}
                title={`Ingresa el valor para ${name}`}
                type={type}
                value={data[name]}
              />
            </fieldset>
          ))}
          <aside>
            <button
              aria-label="Enviar el formulario para crear nuevo registro"
              title="Enviar el formulario para crear nuevo registro"
              type="submit"
            >
              Crear registro
            </button>
          </aside>
        </form>
      )}
    </>
  );
}
