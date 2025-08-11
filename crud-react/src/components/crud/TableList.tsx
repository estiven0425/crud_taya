import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Style from "../../styles/crud/table-list.module.scss";

interface TableListProps {
  url: string;
}

export function TableList({ url }: TableListProps) {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [selectedItem, setSelectedItem] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl: string = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${url}`);

        setData(response.data);
      } catch (error) {
        setError(`Error al obtener los datos: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    void getData();
  }, [apiUrl, url]);

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  function extractDisplayValue(obj: Record<string, unknown>): string {
    if ("nombre_perfil" in obj && typeof obj.nombre_perfil === "string") {
      return obj.nombre_perfil;
    }
    if ("nombre_usuario" in obj && typeof obj.nombre_usuario === "string") {
      return obj.nombre_usuario;
    }

    const firstStringProp = Object.values(obj).find(
      (v) => typeof v === "string",
    );

    return typeof firstStringProp === "string" ? firstStringProp : "[objeto]";
  }

  function handleEdit(item: Record<string, unknown>) {
    setSelectedItem(item);

    navigate(`/crud/table/edit_${url}`, { state: selectedItem });
  }

  function handleDelete(item: Record<string, unknown>) {
    setSelectedItem(item);
    setShowConfirm(true);
  }

  function getItemIdEntry(
    item: Record<string, unknown>,
  ): [string, string] | null {
    const idKey = Object.keys(item).find((key) => key.startsWith("id_"));

    const idValue = idKey ? item[idKey] : null;

    if (idKey && (typeof idValue === "string" || typeof idValue === "number")) {
      return [idKey, String(idValue)];
    }

    return null;
  }

  async function confirmDelete() {
    if (!selectedItem) return;

    const idEntry = getItemIdEntry(selectedItem);

    if (!idEntry) {
      console.error("No se pudo encontrar el ID del registro.");

      return;
    }

    const [idKey, idValue] = idEntry;

    try {
      await axios.delete(`${apiUrl}/${url}`, {
        data: { [idKey]: idValue },
      });

      setData((prev) =>
        prev.filter((item) => {
          const entry = getItemIdEntry(item);
          return !entry || entry[1] !== idValue;
        }),
      );
    } catch (err) {
      console.error("Error al eliminar el registro:", err);
    } finally {
      setShowConfirm(false);
      setSelectedItem(null);
    }
  }

  return (
    <>
      {loading ? (
        <div className={Style.alternative} role="status" aria-live="polite">
          <h2>Cargando...</h2>
        </div>
      ) : error ? (
        <div className={Style.alternative} role="status" aria-live="polite">
          <h2>{error}</h2>
        </div>
      ) : headers.length > 0 ? (
        <>
          <table className={Style.table} role="table">
            <thead className={Style.thead}>
              <tr role="row">
                {headers.map((key) => (
                  <th key={key} scope="col" role="columnheader">
                    {key}
                  </th>
                ))}
                <th role="columnheader" aria-label="Acciones"></th>
              </tr>
            </thead>
            <tbody className={Style.tbody}>
              {data.map((row, index) => (
                <tr key={index} role="row">
                  {headers.map((key) => (
                    <td key={key} role="cell">
                      {row[key] === null || row[key] === ""
                        ? "null"
                        : typeof row[key] === "boolean"
                          ? row[key]
                            ? "True"
                            : "False"
                          : typeof row[key] === "object"
                            ? extractDisplayValue(
                                row[key] as Record<string, unknown>,
                              )
                            : String(row[key])}
                    </td>
                  ))}
                  <td className={Style.tbodyButtons} role="cell">
                    <button
                      aria-label="Editar registro"
                      className={Style.edit}
                      onClick={() => handleEdit(row)}
                      title="Editar registro"
                      type="button"
                    >
                      Editar
                    </button>
                    <button
                      aria-label="Eliminar registro"
                      className={Style.delete}
                      onClick={() => handleDelete(row)}
                      title="Eliminar registro"
                      type="button"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <AnimatePresence>
            {showConfirm && (
              <motion.section
                animate={{ opacity: 1 }}
                aria-labelledby="confirm-title"
                aria-describedby="confirm-desc"
                aria-modal="true"
                className={Style.confirm}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                role="dialog"
                transition={{ duration: 0.5 }}
              >
                <article>
                  <h2>¿Estás seguro de que deseas eliminar este registro?</h2>
                  <aside>
                    <button
                      aria-label="Confirmar eliminación"
                      onClick={confirmDelete}
                      title="Confirmar eliminación"
                      type="button"
                    >
                      Sí
                    </button>
                    <button
                      aria-label="Cancelar eliminación"
                      onClick={() => setShowConfirm(false)}
                      title="Cancelar eliminación"
                      type="button"
                    >
                      No
                    </button>
                  </aside>
                </article>
              </motion.section>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className={Style.alternative} role="status" aria-live="polite">
          <h2>No hay datos disponibles</h2>
        </div>
      )}
    </>
  );
}
