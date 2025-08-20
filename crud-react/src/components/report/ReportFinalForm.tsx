import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as React from "react";
import Style from "../../styles/report/report-final-form.module.scss";

export function ReportFinalForm() {
  type MolinoInformeFinal = {
    id_molino: number;
    nombre_molino: string;
  };
  type TurnoInformeFinal = {
    id_turno: number;
    nombre_turno: string;
  };
  type ReferenciaInformeFinal = {
    id_referencia: number;
    nombre_referencia: string;
  };
  type BultoInformeFinal = {
    id_bulto: number;
    nombre_bulto: string;
    capacidad_bulto: number;
  };

  const [molino, setMolino] = useState<MolinoInformeFinal[]>([]);
  const [turno, setTurno] = useState<TurnoInformeFinal[]>([]);
  const [referencia, setReferencia] = useState<ReferenciaInformeFinal[]>([]);
  const [bulto, setBulto] = useState<BultoInformeFinal[]>([]);

  const [fechaInformeFinal, setFechaInformeFinal] = useState<string>("");
  const [horaInformeFinal, setHoraInformeFinal] = useState<string>("");
  const [turnoInformeFinal, setTurnoInformeFinal] = useState<string>("");
  const [molinoInformeFinal, setMolinoInformeFinal] = useState<string>("");
  const [referenciaInformeFinal, setReferenciaInformeFinal] =
    useState<string>("");
  const [bultoInformeFinal, setBultoInformeFinal] = useState<string>("");
  const [cantidadInformeFinal, setCantidadInformeFinal] = useState<string>("");
  const [horometroInformeFinal, setHorometroInformeFinal] =
    useState<string>("");
  const [observacionInformeFinal, setObservacionInformeFinal] =
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

    const matchingBulk = bulto?.find(
      (item) => item.nombre_bulto === bultoInformeFinal,
    );

    const matchingWindmill = molino?.find(
      (item) => item.nombre_molino === molinoInformeFinal,
    );

    const matchingReference = referencia?.find(
      (item) => item.nombre_referencia === referenciaInformeFinal,
    );

    const cantidadProducido =
      (parseInt(cantidadInformeFinal) * (matchingBulk?.capacidad_bulto ?? 0)) /
      1000;

    const informe_final = [
      {
        fecha_informe_final: fechaInformeFinal,
        hora_informe_final: horaInformeFinal,
        turno_informe_final: turnoInformeFinal,
        molino_informe_final: molinoInformeFinal,
        referencia_informe_final: referenciaInformeFinal,
        bulto_informe_final: bultoInformeFinal,
        cantidad_informe_final: cantidadProducido,
        horometro_informe_final: horometroInformeFinal,
        observacion_informe_final: observacionInformeFinal,
      },
    ];

    const molino_actualizado = {
      id_molino: matchingWindmill?.id_molino,
      horometro_molino: horometroInformeFinal,
    };

    const referencia_actualizada = {
      id_referencia: matchingReference?.id_referencia,
      cantidad_referencia: cantidadProducido,
    };

    try {
      await axios.post(`${apiUrl}/informes_finales/form`, informe_final);
      await axios.put(`${apiUrl}/molinos/hours`, [molino_actualizado]);
      await axios.put(`${apiUrl}/referencias/amount`, [referencia_actualizada]);

      setSendStatus(true);
    } catch (error) {
      console.error("Error al crear el informe final:", error);

      setLoading(false);
    }
  };

  const redirect = () => {
    navigate("/report/list");
  };

  return (
    <>
      <form className={Style.reportFinalForm} onSubmit={sendCreate} role="form">
        <section>
          <fieldset>
            <label htmlFor="turnoControlCalidad">Turno</label>
            <select
              id="turnoControlCalidad"
              name="turnoControlCalidad"
              onChange={(e) => setTurnoInformeFinal(e.target.value)}
              required
              value={turnoInformeFinal}
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
              onChange={(e) => setFechaInformeFinal(e.target.value)}
              placeholder="Ingresa una fecha"
              required
              type="date"
              value={fechaInformeFinal}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="horaControlCalidad">Hora</label>
            <input
              id="horaControlCalidad"
              name="horaControlCalidad"
              onChange={(e) => setHoraInformeFinal(e.target.value)}
              placeholder="Ingresa una hora"
              required
              type="time"
              value={horaInformeFinal}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="molinoControlCalidad">Molino</label>
            <select
              id="molinoControlCalidad"
              name="molinoControlCalidad"
              onChange={(e) => setMolinoInformeFinal(e.target.value)}
              required
              value={molinoInformeFinal}
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
              onChange={(e) => setReferenciaInformeFinal(e.target.value)}
              required
              value={referenciaInformeFinal}
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
              onChange={(e) => setBultoInformeFinal(e.target.value)}
              required
              value={bultoInformeFinal}
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
          <div className={Style.reportFinalFormMainAlternative}>
            <fieldset>
              <label htmlFor="rechazadoControlCalidad">
                Cantidad de bultos producidos
              </label>
              <input
                id="rechazadoControlCalidad"
                name="rechazadoControlCalidad"
                onChange={(e) => setCantidadInformeFinal(e.target.value)}
                placeholder="Ingrese la cantidad de bultos rechazados"
                required
                type="number"
                value={cantidadInformeFinal}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="retencionControlCalidad">Horómetro final</label>
              <input
                id="retencionControlCalidad"
                name="retencionControlCalidad"
                onChange={(e) => setHorometroInformeFinal(e.target.value)}
                placeholder="Ingrese la retención obtenida"
                type="number"
                value={horometroInformeFinal}
                required
              />
            </fieldset>
          </div>
          <fieldset>
            <label htmlFor="observacionControlCalidad">Observación</label>
            <input
              id="observacionControlCalidad"
              name="observacionControlCalidad"
              onChange={(e) => setObservacionInformeFinal(e.target.value)}
              placeholder="Ingresa una observación"
              type="text"
              value={observacionInformeFinal}
            />
          </fieldset>
        </section>
        <footer className={Style.reportFinalFormFooter}>
          <button
            onClick={() => redirect()}
            title="Cancelar creación"
            type="button"
          >
            Cancelar
          </button>
          <button title="Crear nuevo informe final" type="submit">
            {loading ? (
              <div className={Style.loader}>Cargando...</div>
            ) : (
              "Crear informe final"
            )}
          </button>
        </footer>
      </form>
    </>
  );
}
