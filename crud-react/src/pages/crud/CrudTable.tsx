import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CrudTableList } from "../../components/crud/CrudTableList.tsx";
import Style from "../../styles/crud/crud-table.module.scss";

interface Information {
  url: string;
  name: string;
}

export function CrudTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const information = location.state as Information;
  const { url, name } = information;

  const redirect = (): void => {
    navigate("/crud/create", { state: { url: url, name: name } });
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={Style.crudTable}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className={Style.crudTableHeader} role="banner">
        <button
          aria-label={`Crear nuevo registro de ${name}`}
          onClick={() => redirect()}
          title={`Crear nuevo registro de ${name}`}
          type="button"
        >
          Crear {name}
        </button>
      </header>
      <main className={Style.crudTableMain} role="main">
        <CrudTableList url={url} />
      </main>
      <footer className={Style.crudTableFooter} role="contentinfo">
        <Link title="Ir a las tablas" to="/crud/list">
          Volver
        </Link>
      </footer>
    </motion.div>
  );
}
