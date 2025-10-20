import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Style from "../../styles/crud/crud-list.module.scss";

export function CrudList() {
  const navigate = useNavigate();

  const buttons = [
    { label: "Bob - Cats", name: "bob - cat", url: "bob_cats" },
    { label: "Bultos", name: "bulto", url: "bultos" },
    {
      label: "Controles de calidad",
      name: "control de calidad",
      url: "controles_calidad",
    },
    {
      label: "Despachos comerciales",
      name: "despacho comercial",
      url: "despachos_comerciales",
    },
    { label: "Despachos", name: "despacho", url: "despachos" },
    {
      label: "Informes finales",
      name: "informe final",
      url: "informes_finales",
    },
    {
      label: "Informes iniciales",
      name: "informe inicial",
      url: "informes_iniciales",
    },
    { label: "Inventarios AP", name: "inventario AP", url: "inventario_ap" },
    { label: "Materias primas", name: "materia prima", url: "materias_primas" },
    { label: "Mensajes", name: "mensaje", url: "mensajes" },
    { label: "Molinos", name: "molino", url: "molinos" },
    { label: "Molinos AP", name: "molino AP", url: "molinos_ap" },
    { label: "Novedades", name: "novedad", url: "novedades" },
    { label: "Perfiles", name: "perfil", url: "perfiles" },
    {
      label: "Presupuestos comerciales",
      name: "presupuesto comercial",
      url: "presupuestos_comerciales",
    },
    {
      label: "Productos rechazados",
      name: "producto rechazado",
      url: "productos_rechazados",
    },
    { label: "Referencias", name: "referencia", url: "referencias" },
    { label: "Registros", name: "registro", url: "registros" },
    { label: "Registros AP", name: "registro AP", url: "registros_ap" },
    { label: "Turnos", name: "turno", url: "turnos" },
    { label: "Usuarios", name: "usuario", url: "usuarios" },
  ];

  const redirect = (url: string, name: string): void => {
    navigate("/crud/table", { state: { url: url, name: name } });
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={Style.crudList}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className={Style.crudListHeader} role="banner">
        <h1>Tablas de la base de datos</h1>
      </header>
      <main className={Style.crudListMain} role="main">
        {buttons.map(({ label, url, name }) => (
          <button
            aria-label={`Ir al CRUD de ${label}`}
            key={url}
            onClick={() => redirect(url, name)}
            title={`Ir al CRUD de ${label}`}
            type="button"
          >
            {label}
          </button>
        ))}
      </main>
      <footer className={Style.crudListFooter} role="contentinfo">
        <Link title="Ir a la página principal" to="/">
          Volver
        </Link>
      </footer>
    </motion.div>
  );
}
