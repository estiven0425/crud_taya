import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Style from "../../styles/report/report-list.module.scss";

export function ReportList() {
  const navigate = useNavigate();

  const buttons = [
    {
      label: "Informe inicial",
      name: "informe inicial",
      url: "informes_iniciales",
    },
    { label: "Novedad", name: "novedad", url: "novedades" },
    {
      label: "Control de calidad",
      name: "control de calidad",
      url: "controles_calidad",
    },
    {
      label: "Informe final",
      name: "informe final",
      url: "informes_finales",
    },
  ];

  const redirect = (url: string, name: string): void => {
    navigate(`/report/form_${url}`, { state: { url: url, name: name } });
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={Style.reportList}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className={Style.reportListHeader} role="banner">
        <h1>Generación de informe de turno</h1>
      </header>
      <main className={Style.reportListMain} role="main">
        {buttons.map(({ label, url, name }) => (
          <button
            aria-label={`Ir al generar ${name}`}
            key={url}
            onClick={() => redirect(url, name)}
            title={`Ir al generar ${name}`}
            type="button"
          >
            {label}
          </button>
        ))}
      </main>
      <footer className={Style.reportListFooter} role="contentinfo">
        <Link title="Ir a la página principal" to="/">
          Volver
        </Link>
      </footer>
    </motion.div>
  );
}
