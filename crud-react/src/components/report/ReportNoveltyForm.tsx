import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as React from "react";
import axios from "axios";

import Style from "../../styles/report/report-novelty-form.module.scss";

export function ReportNoveltyForm() {
  type UsuarioNovedad = {
    id_usuario: number;
    nombre_usuario: string;
    perfil_usuario: number;
  };
  type TurnoNovedad = {
    id_turno: number;
    nombre_turno: string;
  };
  type MolinoNovedad = {
    id_molino: number;
    nombre_molino: string;
  };
  type ReferenciaNovedad = {
    id_referencia: number;
    nombre_referencia: string;
  };
  type BultoNovedad = {
    id_bulto: number;
    nombre_bulto: string;
    capacidad_bulto: number;
  };
  type BobCatNovedad = {
    id_bob_cat: number;
    nombre_bob_cat: string;
  };

  const [usuario, setUsuario] = useState<UsuarioNovedad[]>([]);
  const [turno, setTurno] = useState<TurnoNovedad[]>([]);
  const [molino, setMolino] = useState<MolinoNovedad[]>([]);
  const [referencia, setReferencia] = useState<ReferenciaNovedad[]>([]);
  const [bulto, setBulto] = useState<BultoNovedad[]>([]);
  const [bobCat, setBobCat] = useState<BobCatNovedad[]>([]);

  const [fechaNovedad, setFechaNovedad] = useState<string>("");
  const [fechaAuxiliarNovedad, setFechaAuxiliarNovedad] = useState<string>("");
  const [horaNovedad, setHoraNovedad] = useState<string>("");
  const [turnoNovedad, setTurnoNovedad] = useState<string>("");
  const [tipoNovedad, setTipoNovedad] = useState<string>("");
  const [molinoNovedad, setMolinoNovedad] = useState<string>("");
  const [referenciaNovedad, setReferenciaNovedad] = useState<string>("");
  const [bultoNovedad, setBultoNovedad] = useState<string>("");
  const [operadorNovedad, setOperadorNovedad] = useState<string>("");
  const [bobCatNovedad, setBobCatNovedad] = useState<string>("");
  const [cargueroNovedad, setCargueroNovedad] = useState<string>("");
  const [mecanicoNovedad, setMecanicoNovedad] = useState<string>("");
  const [inicioParoNovedad, setInicioParoNovedad] = useState<string>("");
  const [finParoNovedad, setFinParoNovedad] = useState<string>("");
  const [horometroInicioParoNovedad, setHorometroInicioParoNovedad] =
    useState<string>("");
  const [horometroFinParoNovedad, setHorometroFinParoNovedad] =
    useState<string>("");
  const [motivoNovedad, setMotivoNovedad] = useState<string>("");
  const [observacionNovedad, setObservacionNovedad] = useState<string>("");
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
        const [
          usuarioRes,
          turnoRes,
          molinoRes,
          referenciaRes,
          bultoRes,
          bobCatRes,
        ] = await Promise.all([
          axios.get(`${apiUrl}/usuarios`),
          axios.get(`${apiUrl}/turnos`),
          axios.get(`${apiUrl}/molinos`),
          axios.get(`${apiUrl}/referencias`),
          axios.get(`${apiUrl}/bultos`),
          axios.get(`${apiUrl}/bob_cats`),
        ]);

        setUsuario(usuarioRes.data);
        setTurno(turnoRes.data);
        setMolino(molinoRes.data);
        setReferencia(referenciaRes.data);
        setBulto(bultoRes.data);
        setBobCat(bobCatRes.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    void getItems();
  });

  const sendCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const novedad = {
      fecha_novedad: fechaNovedad,
      fecha_auxiliar_novedad: fechaAuxiliarNovedad,
      hora_novedad: horaNovedad,
      turno_novedad: turnoNovedad,
      tipo_novedad: tipoNovedad,
      molino_novedad: molinoNovedad === "" ? null : molinoNovedad,
      referencia_novedad: referenciaNovedad === "" ? null : referenciaNovedad,
      bulto_novedad: bultoNovedad === "" ? null : bultoNovedad,
      operador_novedad: operadorNovedad === "" ? null : operadorNovedad,
      bob_cat_novedad: bobCatNovedad === "" ? null : bobCatNovedad,
      carguero_novedad: cargueroNovedad === "" ? null : cargueroNovedad,
      mecanico_novedad: mecanicoNovedad === "" ? null : mecanicoNovedad,
      inicio_paro_novedad: inicioParoNovedad === "" ? null : inicioParoNovedad,
      fin_paro_novedad: finParoNovedad === "" ? null : finParoNovedad,
      horometro_inicio_paro_novedad:
        horometroInicioParoNovedad === "" ? null : horometroInicioParoNovedad,
      horometro_fin_paro_novedad:
        horometroFinParoNovedad === "" ? null : horometroFinParoNovedad,
      motivo_novedad: motivoNovedad === "" ? "No se registró" : motivoNovedad,
      observacion_novedad: observacionNovedad,
    };

    try {
      await axios.post(`${apiUrl}/novedades`, novedad);

      setSendStatus(true);
    } catch (error) {
      console.error("Error al crear la novedad:", error);

      setLoading(false);
    }
  };

  const redirect = () => {
    navigate("/report/list");
  };

  return (
    <>
      <form
        className={Style.reportNoveltyForm}
        onSubmit={sendCreate}
        role="form"
      >
        <section>
          <fieldset>
            <label htmlFor="turnoNovedad">Turno</label>
            <select
              id="turnoNovedad"
              name="turnoNovedad"
              onChange={(e) => setTurnoNovedad(e.target.value)}
              required
              value={turnoNovedad}
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
            <label htmlFor="fechaNovedad">Fecha</label>
            <input
              id="fechaNovedad"
              name="fechaNovedad"
              onChange={(e) => setFechaNovedad(e.target.value)}
              placeholder="Ingresa una fecha"
              required
              type="date"
              value={fechaNovedad}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="fechaAuxiliarNovedad">Fecha auxiliar</label>
            <input
              id="fechaAuxiliarNovedad"
              name="fechaAuxiliarNovedad"
              onChange={(e) => setFechaAuxiliarNovedad(e.target.value)}
              placeholder="Ingresa una fecha real"
              required
              type="date"
              value={fechaAuxiliarNovedad}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="horaNovedad">Hora</label>
            <input
              id="horaNovedad"
              name="horaNovedad"
              onChange={(e) => setHoraNovedad(e.target.value)}
              placeholder="Ingresa una hora"
              required
              type="time"
              value={horaNovedad}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="tipoNovedad">Tipo novedad</label>
            <select
              id="tipoNovedad"
              name="tipoNovedad"
              onChange={(e) => setTipoNovedad(e.target.value)}
              required
              value={tipoNovedad}
            >
              <option value="" disabled>
                Selecciona un tipo de novedad
              </option>
              <option value="Paro">Paro</option>
              <option value="Cambio de referencia">Cambio de referencia</option>
              <option value="Cambio de operador de molino">
                Cambio de operador de molino
              </option>
              <option value="Cambio de operador de minicargador">
                Cambio de operador de minicargador
              </option>
              <option value="Adición de mecánico">Adición de mecánico</option>
              <option value="Encendido de molino">Encendido de molino</option>
            </select>
          </fieldset>
          {tipoNovedad === "Paro" ? (
            <>
              <fieldset>
                <label htmlFor="molinoNovedad">Molino</label>
                <select
                  id="molinoNovedad"
                  name="molinoNovedad"
                  onChange={(e) => setMolinoNovedad(e.target.value)}
                  required
                  value={molinoNovedad}
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
                <label htmlFor="referenciaNovedad">Referencia</label>
                <select
                  id="referenciaNovedad"
                  name="referenciaNovedad"
                  onChange={(e) => setReferenciaNovedad(e.target.value)}
                  required
                  value={referenciaNovedad}
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
                <label htmlFor="bultoNovedad">Bulto</label>
                <select
                  id="bultoNovedad"
                  name="bultoNovedad"
                  onChange={(e) => setBultoNovedad(e.target.value)}
                  required
                  value={bultoNovedad}
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
              <fieldset>
                <label htmlFor="operadorNovedad">Operador de molino</label>
                <select
                  id="operadorNovedad"
                  name="operadorNovedad"
                  onChange={(e) => setOperadorNovedad(e.target.value)}
                  required
                  value={operadorNovedad}
                >
                  <option value="" disabled>
                    Selecciona un operador
                  </option>
                  {usuario
                    .filter((usuario) => usuario.perfil_usuario === 6)
                    .map((usuario) => (
                      <option
                        key={usuario.id_usuario}
                        value={usuario.id_usuario}
                      >
                        {usuario.nombre_usuario}
                      </option>
                    ))}
                </select>
              </fieldset>
              <fieldset>
                <label htmlFor="inicioParoNovedad">Inicio paro</label>
                <input
                  id="inicioParoNovedad"
                  name="inicioParoNovedad"
                  onChange={(e) => setInicioParoNovedad(e.target.value)}
                  placeholder="Ingresa una hora de inicio del paro"
                  required
                  type="time"
                  value={inicioParoNovedad}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="finParoNovedad">Fin paro</label>
                <input
                  id="finParoNovedad"
                  name="finParoNovedad"
                  onChange={(e) => setFinParoNovedad(e.target.value)}
                  placeholder="Ingresa una hora de fin del paro"
                  type="time"
                  value={finParoNovedad}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="horometroInicioParoNovedad">
                  Horómetro de inicio de paro
                </label>
                <input
                  id="horometroInicioParoNovedad"
                  name="horometroInicioParoNovedad"
                  onChange={(e) =>
                    setHorometroInicioParoNovedad(e.target.value)
                  }
                  placeholder="Ingresa un horómetro de inicio del paro"
                  required
                  type="number"
                  value={horometroInicioParoNovedad}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="horometroFinParoNovedad">
                  Horómetro de fin de paro
                </label>
                <input
                  id="horometroFinParoNovedad"
                  name="horometroFinParoNovedad"
                  onChange={(e) => setHorometroFinParoNovedad(e.target.value)}
                  placeholder="Ingresa un horómetro de fin del paro"
                  type="number"
                  value={horometroFinParoNovedad}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="motivoNovedad">Motivo paro novedad</label>
                <select
                  id="motivoNovedad"
                  name="motivoNovedad"
                  onChange={(e) => setMotivoNovedad(e.target.value)}
                  required
                  value={motivoNovedad}
                >
                  <option value="" disabled>
                    Selecciona un motivo de paro
                  </option>
                  <option value="Sostenimiento general">
                    Sostenimiento general
                  </option>
                  <option value="Mecánico">Mecánico</option>
                  <option value="Eléctrico">Eléctrico</option>
                  <option value="Corte de energía">Corte de energía</option>
                  <option value="Materia prima">Materia prima</option>
                  <option value="Empaque">Empaque</option>
                  <option value="Guijos">Guijos</option>
                  <option value="Personal">Personal</option>
                  <option value="Programado">Programado</option>
                  <option value="Bodega">Bodega</option>
                  <option value="Apagado">Apagado</option>
                  <option value="Otro">Otro</option>
                </select>
              </fieldset>
            </>
          ) : tipoNovedad === "Cambio de referencia" ||
            tipoNovedad === "Cambio de operador de molino" ? (
            <>
              <fieldset>
                <label htmlFor="molinoNovedad">Molino</label>
                <select
                  id="molinoNovedad"
                  name="molinoNovedad"
                  onChange={(e) => setMolinoNovedad(e.target.value)}
                  required
                  value={molinoNovedad}
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
                <label htmlFor="referenciaNovedad">Referencia</label>
                <select
                  id="referenciaNovedad"
                  name="referenciaNovedad"
                  onChange={(e) => setReferenciaNovedad(e.target.value)}
                  required
                  value={referenciaNovedad}
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
                <label htmlFor="bultoNovedad">Bulto</label>
                <select
                  id="bultoNovedad"
                  name="bultoNovedad"
                  onChange={(e) => setBultoNovedad(e.target.value)}
                  required
                  value={bultoNovedad}
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
              <fieldset>
                <label htmlFor="operadorNovedad">Operador de molino</label>
                <select
                  id="operadorNovedad"
                  name="operadorNovedad"
                  onChange={(e) => setOperadorNovedad(e.target.value)}
                  required
                  value={operadorNovedad}
                >
                  <option value="" disabled>
                    Selecciona un operador
                  </option>
                  {usuario
                    .filter((usuario) => usuario.perfil_usuario === 6)
                    .map((usuario) => (
                      <option
                        key={usuario.id_usuario}
                        value={usuario.id_usuario}
                      >
                        {usuario.nombre_usuario}
                      </option>
                    ))}
                </select>
              </fieldset>
            </>
          ) : tipoNovedad === "Cambio de operador de minicargador" ? (
            <>
              <fieldset>
                <label htmlFor="bobCatNovedad">Bob - Cat</label>
                <select
                  id="bobCatNovedad"
                  name="bobCatNovedad"
                  onChange={(e) => setBobCatNovedad(e.target.value)}
                  required
                  value={bobCatNovedad}
                >
                  <option value="" disabled>
                    Selecciona un Bob - Cat
                  </option>
                  {bobCat.map((bobCat) => (
                    <option
                      key={bobCat.id_bob_cat}
                      value={bobCat.nombre_bob_cat}
                    >
                      {bobCat.nombre_bob_cat}
                    </option>
                  ))}
                </select>
              </fieldset>
              <fieldset>
                <label htmlFor="cargueroNovedad">
                  Operador de minicargador
                </label>
                <select
                  id="cargueroNovedad"
                  name="cargueroNovedad"
                  onChange={(e) => setCargueroNovedad(e.target.value)}
                  required
                  value={cargueroNovedad}
                >
                  <option value="" disabled>
                    Selecciona un operador
                  </option>
                  {usuario
                    .filter((usuario) => usuario.perfil_usuario === 8)
                    .map((usuario) => (
                      <option
                        key={usuario.id_usuario}
                        value={usuario.id_usuario}
                      >
                        {usuario.nombre_usuario}
                      </option>
                    ))}
                </select>
              </fieldset>
            </>
          ) : tipoNovedad === "Adición de mecánico" ? (
            <>
              <fieldset>
                <label htmlFor="mecanicoNovedad">Mecánico</label>
                <select
                  id="mecanicoNovedad"
                  name="mecanicoNovedad"
                  onChange={(e) => setMecanicoNovedad(e.target.value)}
                  required
                  value={mecanicoNovedad}
                >
                  <option value="" disabled>
                    Selecciona un mecánico
                  </option>
                  {usuario
                    .filter((usuario) => usuario.perfil_usuario === 7)
                    .map((usuario) => (
                      <option
                        key={usuario.id_usuario}
                        value={usuario.id_usuario}
                      >
                        {usuario.nombre_usuario}
                      </option>
                    ))}
                </select>
              </fieldset>
            </>
          ) : tipoNovedad === "Encendido de molino" ? (
            <>
              <fieldset>
                <label htmlFor="molinoNovedad">Molino</label>
                <select
                  id="molinoNovedad"
                  name="molinoNovedad"
                  onChange={(e) => setMolinoNovedad(e.target.value)}
                  required
                  value={molinoNovedad}
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
                <label htmlFor="referenciaNovedad">Referencia</label>
                <select
                  id="referenciaNovedad"
                  name="referenciaNovedad"
                  onChange={(e) => setReferenciaNovedad(e.target.value)}
                  required
                  value={referenciaNovedad}
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
                <label htmlFor="bultoNovedad">Bulto</label>
                <select
                  id="bultoNovedad"
                  name="bultoNovedad"
                  onChange={(e) => setBultoNovedad(e.target.value)}
                  required
                  value={bultoNovedad}
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
              <fieldset>
                <label htmlFor="operadorNovedad">Operador de molino</label>
                <select
                  id="operadorNovedad"
                  name="operadorNovedad"
                  onChange={(e) => setOperadorNovedad(e.target.value)}
                  required
                  value={operadorNovedad}
                >
                  <option value="" disabled>
                    Selecciona un operador
                  </option>
                  {usuario
                    .filter((usuario) => usuario.perfil_usuario === 6)
                    .map((usuario) => (
                      <option
                        key={usuario.id_usuario}
                        value={usuario.id_usuario}
                      >
                        {usuario.nombre_usuario}
                      </option>
                    ))}
                </select>
              </fieldset>
              <fieldset>
                <label htmlFor="horometroNovedad">Horómetro</label>
                <input
                  id="horometroNovedad"
                  name="horometroNovedad"
                  onChange={(e) => {
                    setHorometroInicioParoNovedad(e.target.value);
                    setHorometroFinParoNovedad(e.target.value);
                  }}
                  placeholder="Ingresa un horómetro"
                  required
                  type="number"
                  value={horometroInicioParoNovedad}
                />
              </fieldset>
            </>
          ) : (
            <></>
          )}
          <fieldset>
            <label htmlFor="observacionNovedad">Observación</label>
            <input
              id="observacionNovedad"
              name="observacionNovedad"
              onChange={(e) => setObservacionNovedad(e.target.value)}
              placeholder="Ingresa una observación"
              type="text"
              value={observacionNovedad}
            />
          </fieldset>
        </section>
        <footer className={Style.reportNoveltyFormFooter}>
          <button
            onClick={() => redirect()}
            title="Cancelar creación"
            type="button"
          >
            Cancelar
          </button>
          <button title="Crear nueva novedad" type="submit">
            {loading ? (
              <div className={Style.loader}>Cargando...</div>
            ) : (
              "Crear novedad"
            )}
          </button>
        </footer>
      </form>
    </>
  );
}
