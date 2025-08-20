import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as React from "react";
import Style from "../../styles/report/report-initial-form.module.scss";

export function ReportInitialForm() {
  type UsuarioInformeInicial = {
    id_usuario: number;
    nombre_usuario: string;
  };
  type TurnoInformeInicial = {
    id_turno: number;
    nombre_turno: string;
  };
  type MolinoInformeInicial = {
    id_molino: number;
    nombre_molino: string;
  };
  type ReferenciaInformeInicial = {
    id_referencia: number;
    nombre_referencia: string;
  };
  type BultoInformeInicial = {
    id_bulto: number;
    nombre_bulto: string;
  };
  type BobCatInformeInicial = {
    id_bob_cat: number;
    nombre_bob_cat: string;
  };

  const [supervisor, setSupervisor] = useState<UsuarioInformeInicial[]>([]);
  const [controlCalidad, setControlCalidad] = useState<UsuarioInformeInicial[]>(
    [],
  );
  const [mecanico, setMecanico] = useState<UsuarioInformeInicial[]>([]);
  const [turno, setTurno] = useState<TurnoInformeInicial[]>([]);
  const [operador, setOperador] = useState<UsuarioInformeInicial[]>([]);
  const [molino, setMolino] = useState<MolinoInformeInicial[]>([]);
  const [referencia, setReferencia] = useState<ReferenciaInformeInicial[]>([]);
  const [bulto, setBulto] = useState<BultoInformeInicial[]>([]);
  const [carguero, setCarguero] = useState<UsuarioInformeInicial[]>([]);
  const [bobCat, setBobCat] = useState<BobCatInformeInicial[]>([]);

  const [titularInformeInicial, setTitularInformeInicial] =
    useState<string>("");
  const [fechaInformeInicial, setFechaInformeInicial] = useState<string>("");
  const [horaInformeInicial, setHoraInformeInicial] = useState<string>("");
  const [turnoInformeInicial, setTurnoInformeInicial] = useState<string>("");
  const [controlCalidadInformeInicial, setControlCalidadInformeInicial] =
    useState<UsuarioInformeInicial[]>([]);

  const [mecanicoInformeInicial, setMecanicoInformeInicial] = useState<
    UsuarioInformeInicial[]
  >([]);
  const [operadorInformeInicial, setOperadorInformeInicial] = useState<
    string[]
  >([]);
  const [molinoInformeInicial, setMolinoInformeInicial] = useState<string[]>(
    [],
  );
  const [referenciaInformeInicial, setReferenciaInformeInicial] = useState<
    string[]
  >([]);
  const [bultoInformeInicial, setBultoInformeInicial] = useState<string[]>([]);
  const [horometroInformeInicial, setHorometroInformeInicial] = useState<
    string[]
  >([]);
  const [cargueroInformeInicial, setCargueroInformeInicial] = useState<
    string[]
  >([]);
  const [bobCatInformeInicial, setBobCatInformeInicial] = useState<string[]>(
    [],
  );
  const [observacionInformeInicial, setObservacionInformeInicial] =
    useState<string>("");
  const [selectedControlCalidad, setSelectedControlCalidad] =
    useState<string>("");
  const [selectedMecanico, setSelectedMecanico] = useState<string>("");
  const [molinoEnabled, setMolinoEnabled] = useState<boolean[]>([]);
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
        const [turnoRes, bobCatRes, molinoRes, referenciaRes, bultoRes] =
          await Promise.all([
            axios.get(`${apiUrl}/turnos`),
            axios.get(`${apiUrl}/bob_cats`),
            axios.get(`${apiUrl}/molinos`),
            axios.get(`${apiUrl}/referencias`),
            axios.get(`${apiUrl}/bultos`),
          ]);

        setTurno(turnoRes.data);
        setBobCat(bobCatRes.data);
        setMolino(molinoRes.data);
        setReferencia(referenciaRes.data);
        setBulto(bultoRes.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    void getItems();
  }, [apiUrl]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const perfiles = [3, 4, 7, 6, 8];

        const respuestas = await Promise.all(
          perfiles.map((id_perfil) =>
            axios.post<UsuarioInformeInicial[]>(
              `${apiUrl}/usuarios/informeinicialusuario`,
              {
                id_perfil,
              },
            ),
          ),
        );

        const [
          supervisorRes,
          controlCalidadRes,
          mecanicoRes,
          operadorRes,
          cargueroRes,
        ] = respuestas;

        setSupervisor(supervisorRes.data);
        setControlCalidad(controlCalidadRes.data);
        setMecanico(mecanicoRes.data);
        setOperador(operadorRes.data);
        setCarguero(cargueroRes.data);
      } catch (error: unknown) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    void getUsers();
  }, [apiUrl]);

  useEffect(() => {
    const molinoTyped = molino as { nombre_molino: string }[];

    setMolinoInformeInicial(
      molinoTyped.map((molinoItem) => molinoItem.nombre_molino),
    );
  }, [molino]);

  useEffect(() => {
    const bobCatTyped = bobCat as { nombre_bob_cat: string }[];

    setBobCatInformeInicial(
      bobCatTyped.map((bobCatItem) => bobCatItem.nombre_bob_cat),
    );
  }, [bobCat]);

  useEffect(() => {
    setOperadorInformeInicial(new Array(molino.length).fill(""));
    setReferenciaInformeInicial(new Array(molino.length).fill(""));
    setBultoInformeInicial(new Array(molino.length).fill(""));
    setHorometroInformeInicial(new Array(molino.length).fill(""));
  }, [molino]);

  useEffect(() => {
    setOperadorInformeInicial(new Array(molino.length).fill(""));
  }, [molino]);

  useEffect(() => {
    setBultoInformeInicial(new Array(bulto.length).fill(""));
  }, [bulto]);

  useEffect(() => {
    setReferenciaInformeInicial(new Array(referencia.length).fill(""));
  }, [referencia]);

  useEffect(() => {
    setMolinoEnabled(new Array(molino.length).fill(false));
  }, [molino]);

  useEffect(() => {
    setCargueroInformeInicial(new Array(bobCat.length).fill(""));
  }, [bobCat]);

  useEffect(() => {
    setMolinoEnabled(new Array(molino.length).fill(true));
  }, [molino]);

  const addQualityControl = (id_usuario: number, nombre_usuario: string) => {
    setControlCalidadInformeInicial((prev) => [
      ...prev,
      { id_usuario, nombre_usuario },
    ]);
  };

  const removeQualityControl = (index: number) => {
    setControlCalidadInformeInicial((prev) =>
      prev.filter((_, i) => i !== index),
    );
  };

  const addMechanic = (id_usuario: number, nombre_usuario: string) => {
    setMecanicoInformeInicial((prev) => [
      ...prev,
      { id_usuario, nombre_usuario },
    ]);
  };

  const removeMechanic = (index: number) => {
    setMecanicoInformeInicial((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOperadorChange = (index: number, value: string) => {
    setOperadorInformeInicial((prev) => {
      const updated = [...prev];

      updated[index] = value;

      return updated;
    });
  };

  const handleReferenciaChange = (index: number, value: string) => {
    setReferenciaInformeInicial((prev) => {
      const updated = [...prev];

      updated[index] = value;

      return updated;
    });
  };

  const handleBultoChange = (index: number, value: string) => {
    setBultoInformeInicial((prev) => {
      const updated = [...prev];

      updated[index] = value;

      return updated;
    });
  };

  const handleHorometroChange = (index: number, value: string) => {
    setHorometroInformeInicial((prev) => {
      const updated = [...prev];

      updated[index] = value;

      return updated;
    });
  };

  const handleCargueroChange = (index: number, value: string) => {
    setCargueroInformeInicial((prev) => {
      const updated = [...prev];

      updated[index] = value;

      return updated;
    });
  };

  const handleMolinoToggle = (index: number) => {
    setMolinoEnabled((prev) => {
      const updated = [...prev];

      updated[index] = !updated[index];

      return updated;
    });
  };

  const sendCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const persistentData = {
      titular_informe_inicial: titularInformeInicial,
      fecha_informe_inicial: fechaInformeInicial,
      hora_informe_inicial: horaInformeInicial,
      turno_informe_inicial: turnoInformeInicial,
      observacion_informe_inicial: observacionInformeInicial,
    };

    const controlCalidadObjects = controlCalidadInformeInicial.map(
      (control) => ({
        ...persistentData,
        cdc_informe_inicial: control.id_usuario,
      }),
    );

    const mecanicoObjects = mecanicoInformeInicial.map((mecanico) => ({
      ...persistentData,
      mecanico_informe_inicial: mecanico.id_usuario,
    }));

    const molinoObjects = molinoInformeInicial
      .map((_, index) => {
        if (!molinoEnabled[index]) return null;

        return {
          ...persistentData,
          operador_informe_inicial: operadorInformeInicial[index],
          molino_informe_inicial: molinoInformeInicial[index],
          referencia_informe_inicial: referenciaInformeInicial[index],
          bulto_informe_inicial: bultoInformeInicial[index],
          horometro_informe_inicial: horometroInformeInicial[index],
        };
      })
      .filter((molino) => molino !== null);

    const bobCatObjects = bobCatInformeInicial.map((_, index) => ({
      ...persistentData,
      carguero_informe_inicial: cargueroInformeInicial[index],
      bob_cat_informe_inicial: bobCatInformeInicial[index],
    }));

    const fullReport = [
      ...controlCalidadObjects,
      ...mecanicoObjects,
      ...molinoObjects,
      ...bobCatObjects,
    ];

    await axios.post(`${apiUrl}/informes_iniciales/form`, fullReport);

    setSendStatus(true);
  };

  const redirect = () => {
    navigate("/report/list");
  };

  // noinspection PointlessBooleanExpressionJS
  return (
    <form className={Style.reportInitialForm} onSubmit={sendCreate} role="form">
      <section>
        <fieldset className={Style.reportInitialFormPrimary}>
          <label htmlFor="supervisor">Supervisor</label>
          <select
            id="supervisor"
            name="supervisor"
            onChange={(e) => setTitularInformeInicial(e.target.value)}
            required
            value={titularInformeInicial}
          >
            <option value="" disabled>
              Seleccione un supervisor
            </option>
            {supervisor.map((supervisor) => (
              <option key={supervisor.id_usuario} value={supervisor.id_usuario}>
                {supervisor.nombre_usuario}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className={Style.reportInitialFormPrimary}>
          <label htmlFor="turno">Turno</label>
          <select
            id="turno"
            name="turno"
            onChange={(e) => setTurnoInformeInicial(e.target.value)}
            required
            value={turnoInformeInicial}
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
        <fieldset className={Style.reportInitialFormPrimary}>
          <label htmlFor="fecha">Fecha</label>
          <input
            id="fecha"
            name="fecha"
            onChange={(e) => setFechaInformeInicial(e.target.value)}
            placeholder="Ingresa una fecha"
            required
            type="date"
            value={fechaInformeInicial}
          />
        </fieldset>
        <fieldset className={Style.reportInitialFormPrimary}>
          <label htmlFor="hora">Hora</label>
          <input
            id="hora"
            name="hora"
            onChange={(e) => setHoraInformeInicial(e.target.value)}
            placeholder="Ingresa una hora"
            required
            type="time"
            value={horaInformeInicial}
          />
        </fieldset>
        <fieldset className={Style.reportInitialFormPrimary}>
          <label htmlFor="controlcalidad">Control de calidad</label>
          <select
            id="controlcalidad"
            name="controlcalidad"
            value={selectedControlCalidad}
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              const id_usuario = Number(e.target.value);
              const nombre_usuario = selectedOption.text;

              addQualityControl(id_usuario, nombre_usuario);
              setSelectedControlCalidad("");
            }}
          >
            <option value="" disabled>
              Añade un usuario de control de calidad
            </option>
            {controlCalidad.map((cdc) => (
              <option key={cdc.id_usuario} value={cdc.id_usuario}>
                {cdc.nombre_usuario}
              </option>
            ))}
          </select>
          <ul>
            {controlCalidadInformeInicial.map((item, index) => (
              <li key={index}>
                {item.nombre_usuario}{" "}
                <button
                  type="button"
                  onClick={() => removeQualityControl(index)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </fieldset>
        <fieldset className={Style.reportInitialFormPrimary}>
          <label htmlFor="mecanico">Mecánico</label>
          <select
            id="mecanico"
            name="mecanico"
            value={selectedMecanico}
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              const id_usuario = Number(e.target.value);
              const nombre_usuario = selectedOption.text;

              addMechanic(id_usuario, nombre_usuario);
              setSelectedMecanico("");
            }}
          >
            <option value="" disabled>
              Añade un usuario de mecánico
            </option>
            {mecanico.map((mecanico) => (
              <option key={mecanico.id_usuario} value={mecanico.id_usuario}>
                {mecanico.nombre_usuario}
              </option>
            ))}
          </select>
          <ul>
            {mecanicoInformeInicial.map((item, index) => (
              <li key={index}>
                {item.nombre_usuario}{" "}
                <button type="button" onClick={() => removeMechanic(index)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </fieldset>
        {molino.map((molinoItem, index) => (
          <fieldset className={Style.reportInitialFormSecondary} key={index}>
            <div className={Style.reportInitialFormEspecialAlternative}>
              <h2>{molinoItem.nombre_molino}</h2>
              <div>
                <label>
                  Habilitar molino
                  <input
                    checked={!!molinoEnabled[index]}
                    onChange={() => handleMolinoToggle(index)}
                    type="checkbox"
                  />
                </label>
              </div>
            </div>
            <div className={Style.reportInitialFormEspecial}>
              <label htmlFor={`operador-${index}`}>Operador de molino</label>
              <select
                disabled={!molinoEnabled[index]}
                id={`operador-${index}`}
                name={`operador-${index}`}
                onChange={(e) => handleOperadorChange(index, e.target.value)}
                value={operadorInformeInicial[index] || ""}
              >
                <option value="" disabled>
                  Seleccione un operador de molino
                </option>
                {operador.map((operador) => (
                  <option key={operador.id_usuario} value={operador.id_usuario}>
                    {operador.nombre_usuario}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`referencia-${index}`}>Referencia</label>
              <select
                disabled={!molinoEnabled[index]}
                id={`referencia-${index}`}
                name={`referencia-${index}`}
                onChange={(e) => handleReferenciaChange(index, e.target.value)}
                value={referenciaInformeInicial[index] || ""}
              >
                <option value="" disabled>
                  Seleccione una referencia
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
            </div>
            <div>
              <label htmlFor={`bulto-${index}`}>Bulto</label>
              <select
                disabled={!molinoEnabled[index]}
                id={`bulto-${index}`}
                name={`bulto-${index}`}
                onChange={(e) => handleBultoChange(index, e.target.value)}
                value={bultoInformeInicial[index] || ""}
              >
                <option value="" disabled>
                  Seleccione un bulto
                </option>
                {bulto.map((bulto) => (
                  <option key={bulto.id_bulto} value={bulto.nombre_bulto}>
                    {bulto.nombre_bulto}
                  </option>
                ))}
              </select>
            </div>
            <div className={Style.reportInitialFormEspecial}>
              <label htmlFor={`horometro-${index}`}>Horómetro</label>
              <input
                disabled={!molinoEnabled[index]}
                id={`horometro-${index}`}
                name={`horometro-${index}`}
                onChange={(e) => handleHorometroChange(index, e.target.value)}
                placeholder="Ingresa el horómetro del molino"
                type="number"
                value={horometroInformeInicial[index] ?? ""}
              />
            </div>
          </fieldset>
        ))}
        {bobCat.map((bobCatItem, index) => (
          <fieldset key={index} className={Style.reportInitialFormThird}>
            <h2>{bobCatItem.nombre_bob_cat}</h2>
            <label htmlFor={`carguero-${index}`}>
              Operador de minicargador
            </label>
            <select
              id={`carguero-${index}`}
              name={`carguero-${index}`}
              onChange={(e) => handleCargueroChange(index, e.target.value)}
              required
              value={cargueroInformeInicial[index] || ""}
            >
              <option value="" disabled>
                Seleccione un operador de minicargador
              </option>
              {carguero.map((carguero) => (
                <option key={carguero.id_usuario} value={carguero.id_usuario}>
                  {carguero.nombre_usuario}
                </option>
              ))}
            </select>
          </fieldset>
        ))}
        <fieldset className={Style.reportInitialFormFourth}>
          <label htmlFor="observacion">Observación</label>
          <input
            id="observacion"
            name="observacion"
            onChange={(e) => setObservacionInformeInicial(e.target.value)}
            placeholder="Ingresa una observación"
            type="text"
            value={observacionInformeInicial}
          />
        </fieldset>
      </section>
      <footer className={Style.reportInitialFormFooter}>
        <button onClick={() => redirect()} title="Cancelar creación" type="button">
          Cancelar
        </button>
        <button title="Crear nuevo informe inicial" type="submit">
          {loading ? (
            <div className={Style.loader}>Cargando...</div>
          ) : (
            "Crear Informe inicial"
          )}
        </button>
      </footer>
    </form>
  );
}
