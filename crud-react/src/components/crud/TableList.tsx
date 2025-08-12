import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
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
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<Record<string, unknown> | null>(
    null,
  );
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
    setEditedItem({ ...item });
    setEditMode(true);
  }

  function cancelEdit() {
    setEditMode(false);
    setEditedItem(null);
    setSelectedItem(null);
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

  function getInputType(value: unknown): string {
    if (typeof value !== "string") return "text";

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const timeRegex = /^\d{2}:\d{2}:\d{2}$/;
    const floatRegex = /^[+-]?\d+([.,]\d+)?$/;
    const numberRegex = /^\d+$/;
    const hasLetters = /[a-zA-Z]/.test(value);

    if (dateRegex.test(value)) return "date";
    if (timeRegex.test(value)) return "time";
    if (hasLetters) return "text";
    if (floatRegex.test(value)) return "number";
    if (numberRegex.test(value)) return "number";

    return "text";
  }

  async function confirmEdit() {
    if (!editedItem) return;

    const idEntry = getItemIdEntry(editedItem);

    if (!idEntry) return;

    const [idKey, idValue] = idEntry;

    try {
      await axios.put(`${apiUrl}/${url}`, editedItem);

      setData((prev) =>
        prev.map((item) => {
          const entry = getItemIdEntry(item);

          return entry && entry[1] === idValue ? editedItem : item;
        }),
      );
    } catch (error) {
      console.error(`Error al actualizar el registro: ${idKey}` + error);
    } finally {
      setEditMode(false);
      setEditedItem(null);
      setSelectedItem(null);
    }
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
    } catch (error) {
      console.error("Error al eliminar el registro:" + error);
    } finally {
      setShowConfirm(false);
      setSelectedItem(null);
    }
  }

  const actualizacionIndex = headers.findIndex((key) =>
    key.startsWith("actualizacion_"),
  );

  return (
    <>
      {loading ? (
        <div
          className={Style.tableListAlternative}
          role="status"
          aria-live="polite"
        >
          <h2>Cargando...</h2>
        </div>
      ) : error ? (
        <div
          className={Style.tableListAlternative}
          role="status"
          aria-live="polite"
        >
          <h2>{error}</h2>
        </div>
      ) : headers.length > 0 ? (
        <>
          <table className={Style.tableList} role="table">
            <thead className={Style.thead}>
              <tr role="row">
                {headers.map((key) => (
                  <th key={key} role="columnheader" scope="col">
                    {key}
                  </th>
                ))}
                <th aria-label="Acciones" role="columnheader">
                  acciones
                </th>
              </tr>
            </thead>
            <tbody className={Style.tbody}>
              {data.map((row, index) => {
                const isEditing = editMode && selectedItem === row;
                const isOtherRowDisabled = editMode && selectedItem !== row;

                return (
                  <tr key={index} role="row">
                    {headers.map((key, i) => {
                      const isEditable =
                        !key.startsWith("id_") &&
                        !key.startsWith("actualizacion_") &&
                        !key.startsWith("actividad_") &&
                        !key.startsWith("contrasena_") &&
                        (actualizacionIndex === -1 || i < actualizacionIndex);

                      const value = isEditing ? editedItem?.[key] : row[key];

                      return (
                        <AnimatePresence key={key}>
                          <motion.td
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            initial={{ opacity: 0 }}
                            role="cell"
                            transition={{ duration: 0.5 }}
                          >
                            {isEditing && isEditable ? (
                              <motion.input
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                initial={{ opacity: 0 }}
                                onChange={(e) =>
                                  setEditedItem((prev) =>
                                    prev
                                      ? { ...prev, [key]: e.target.value }
                                      : prev,
                                  )
                                }
                                title="Ingresa el nuevo valor o deja el actual"
                                transition={{ duration: 0.5 }}
                                type={getInputType(String(value))}
                                value={
                                  value !== null && value !== undefined
                                    ? String(value)
                                    : ""
                                }
                              />
                            ) : row[key] === null || row[key] === "" ? (
                              "null"
                            ) : typeof row[key] === "boolean" ? (
                              row[key] ? (
                                "True"
                              ) : (
                                "False"
                              )
                            ) : typeof row[key] === "object" ? (
                              extractDisplayValue(
                                row[key] as Record<string, unknown>,
                              )
                            ) : (
                              String(row[key])
                            )}
                          </motion.td>
                        </AnimatePresence>
                      );
                    })}
                    <td className={Style.buttons} role="cell">
                      {editMode && selectedItem === row ? (
                        <>
                          <button
                            aria-label="Confirmar edición"
                            className={Style.confirm}
                            onClick={confirmEdit}
                            title="Confirmar edición"
                            type="button"
                          >
                            Confirmar
                          </button>
                          <button
                            aria-label="Cancelar edición"
                            className={Style.cancel}
                            onClick={cancelEdit}
                            title="Cancelar edición"
                            type="button"
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            aria-label="Editar registro"
                            className={Style.edit}
                            disabled={isOtherRowDisabled}
                            onClick={() => handleEdit(row)}
                            title="Editar registro"
                            type="button"
                          >
                            Editar
                          </button>
                          <button
                            aria-label="Eliminar registro"
                            className={Style.delete}
                            disabled={isOtherRowDisabled}
                            onClick={() => handleDelete(row)}
                            title="Eliminar registro"
                            type="button"
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <AnimatePresence>
            {showConfirm && (
              <motion.section
                animate={{ opacity: 1 }}
                aria-describedby="confirm-desc"
                aria-labelledby="confirm-title"
                aria-modal="true"
                className={Style.showConfirm}
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
        <div className={Style.tableListAlternative} role="status" aria-live="polite">
          <h2>No hay datos disponibles</h2>
        </div>
      )}
    </>
  );
}
