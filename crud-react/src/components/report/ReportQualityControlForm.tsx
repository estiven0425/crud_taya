import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as React from "react";
import axios from "axios";

import Style from "../../styles/report/report-quality-control-form.module.scss";

export function ReportQualityControlForm() {
  type MolinoControlCalidad = {
    id_molino: number;
    nombre_molino: string;
  };
  type TurnoControlCalidad = {
    id_turno: number;
    nombre_turno: string;
  };
  type ReferenciaControlCalidad = {
    id_referencia: number;
    nombre_referencia: string;
  };
  type BultoControlCalidad = {
    id_bulto: number;
    nombre_bulto: string;
    capacidad_bulto: number;
  };

  const [molino, setMolino] = useState<MolinoControlCalidad[]>([]);
  const [turno, setTurno] = useState<TurnoControlCalidad[]>([]);
  const [referencia, setReferencia] = useState<ReferenciaControlCalidad[]>([]);
  const [bulto, setBulto] = useState<BultoControlCalidad[]>([]);

  const [fechaControlCalidad, setFechaControlCalidad] = useState<string>("");
  const [horaControlCalidad, setHoraControlCalidad] = useState<string>("");
  const [turnoControlCalidad, setTurnoControlCalidad] = useState<string>("");
  const [molinoControlCalidad, setMolinoControlCalidad] = useState<string>("");
  const [referenciaControlCalidad, setReferenciaControlCalidad] =
    useState<string>("");
  const [bultoControlCalidad, setBultoControlCalidad] = useState<string>("");
  const [rechazadoControlCalidad, setRechazadoControlCalidad] =
    useState<string>("");
  const [retencionControlCalidad, setRetencionControlCalidad] =
    useState<string>("");
  const [observacionControlCalidad, setObservacionControlCalidad] =
    useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sendStatus, setSendStatus] = useState<boolean>(false);

  const navigate = useNavigate();

  const apiUrl: string = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (sendStatus) {
      const timer = setTimeout(() => {
        navigate("/report/list");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [sendStatus, navigate]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const [turnoRes, molinoRes, referenciaRes, bultoRes] =
          await Promise.all([
            axios.get(`${apiUrl}/turnos`),
            axios.get(`${apiUrl}/molinos`),
            axios.get(`${apiUrl}/referencias`),
            axios.get(`${apiUrl}/bultos`),
          ]);

        setTurno(turnoRes.data);
        setMolino(molinoRes.data);
        setReferencia(referenciaRes.data);
        setBulto(bultoRes.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    void getItems();
  });

  const sendCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const matchingWindmill = bulto?.find(
      (item) => item.nombre_bulto === bultoControlCalidad,
    );

    const cantidadProductoRechazado =
      ((matchingWindmill?.capacidad_bulto ?? 0) *
        parseInt(rechazadoControlCalidad)) /
      1000;

    const control_calidad = {
      fecha_control_calidad: fechaControlCalidad,
      hora_control_calidad: horaControlCalidad,
      turno_control_calidad: turnoControlCalidad,
      molino_control_calidad: molinoControlCalidad,
      referencia_control_calidad: referenciaControlCalidad,
      bulto_control_calidad: bultoControlCalidad,
      rechazado_control_calidad: rechazadoControlCalidad,
      retencion_control_calidad: retencionControlCalidad,
      observacion_control_calidad: observacionControlCalidad,
    };

    const producto_rechazado = {
      nombre_producto_rechazado: referenciaControlCalidad,
      cantidad_producto_rechazado: cantidadProductoRechazado,
      retencion_producto_rechazado: retencionControlCalidad,
    };

    try {
      await axios.post(`${apiUrl}/controles_calidad`, control_calidad);
      await axios.post(`${apiUrl}/productos_rechazados`, producto_rechazado);

      setSendStatus(true);
    } catch (error) {
      console.error("Error al crear el control de calidad:", error);

      setLoading(false);
    }
  };

  const redirect = () => {
    navigate("/report/list");
  };

  return (
    <>
      <form
        className={Style.reportQualityControlForm}
        onSubmit={sendCreate}
        role="form"
      >
        <section>
          <fieldset>
            <label htmlFor="turnoControlCalidad">Turno</label>
            <select
              id="turnoControlCalidad"
              name="turnoControlCalidad"
              onChange={(e) => setTurnoControlCalidad(e.target.value)}
              required
              value={turnoControlCalidad}
            >
              <option value="" disabled>
                Seleccione un turno
              </option>
              {turno.map((turno) => (
                <option key={turno.id_turno} value={turno.nombre_turno}>
                  {turno.nombre_turno}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <label htmlFor="fechaControlCalidad">Fecha</label>
            <input
              id="fechaControlCalidad"
              name="fechaControlCalidad"
              onChange={(e) => setFechaControlCalidad(e.target.value)}
              placeholder="Ingresa una fecha"
              required
              type="date"
              value={fechaControlCalidad}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="horaControlCalidad">Hora</label>
            <input
              id="horaControlCalidad"
              name="horaControlCalidad"
              onChange={(e) => setHoraControlCalidad(e.target.value)}
              placeholder="Ingresa una hora"
              required
              type="time"
              value={horaControlCalidad}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="molinoControlCalidad">Molino</label>
            <select
              id="molinoControlCalidad"
              name="molinoControlCalidad"
              onChange={(e) => setMolinoControlCalidad(e.target.value)}
              required
              value={molinoControlCalidad}
            >
              <option value="" disabled>
                Selecciona un molino
              </option>
              {molino.map((molino) => (
                <option key={molino.id_molino} value={molino.nombre_molino}>
                  {molino.nombre_molino}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <label htmlFor="referenciaControlCalidad">Referencia</label>
            <select
              id="referenciaControlCalidad"
              name="referenciaControlCalidad"
              onChange={(e) => setReferenciaControlCalidad(e.target.value)}
              required
              value={referenciaControlCalidad}
            >
              <option value="" disabled>
                Selecciona una referencia
              </option>
              {referencia.map((referencia) => (
                <option
                  key={referencia.id_referencia}
                  value={referencia.nombre_referencia}
                >
                  {referencia.nombre_referencia}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <label htmlFor="bultoControlCalidad">Bulto</label>
            <select
              id="bultoControlCalidad"
              name="bultoControlCalidad"
              onChange={(e) => setBultoControlCalidad(e.target.value)}
              required
              value={bultoControlCalidad}
            >
              <option value="" disabled>
                Selecciona un bulto
              </option>
              {bulto.map((bulto) => (
                <option key={bulto.id_bulto} value={bulto.nombre_bulto}>
                  {bulto.nombre_bulto}
                </option>
              ))}
            </select>
          </fieldset>
          <div className={Style.reportQualityControlFormMainAlternative}>
            <fieldset>
              <label htmlFor="rechazadoControlCalidad">
                Cantidad de bultos rechazados
              </label>
              <input
                id="rechazadoControlCalidad"
                name="rechazadoControlCalidad"
                onChange={(e) => setRechazadoControlCalidad(e.target.value)}
                placeholder="Ingrese la cantidad de bultos rechazados"
                required
                type="number"
                value={rechazadoControlCalidad}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="retencionControlCalidad">Retención</label>
              <input
                id="retencionControlCalidad"
                name="retencionControlCalidad"
                onChange={(e) => setRetencionControlCalidad(e.target.value)}
                placeholder="Ingrese la retención obtenida"
                type="number"
                value={retencionControlCalidad}
                required
              />
            </fieldset>
          </div>
          <fieldset>
            <label htmlFor="observacionControlCalidad">Observación</label>
            <input
              id="observacionControlCalidad"
              name="observacionControlCalidad"
              onChange={(e) => setObservacionControlCalidad(e.target.value)}
              placeholder="Ingresa una observación"
              type="text"
              value={observacionControlCalidad}
            />
          </fieldset>
        </section>
        <footer className={Style.reportQualityControlFormFooter}>
          <button
            onClick={() => redirect()}
            title="Cancelar creación"
            type="button"
          >
            Cancelar
          </button>
          <button title="Crear nuevo control de calidad" type="submit">
            {loading ? (
              <div className={Style.loader}>Cargando...</div>
            ) : (
              "Crear control de calidad"
            )}
          </button>
        </footer>
      </form>
    </>
  );
}
