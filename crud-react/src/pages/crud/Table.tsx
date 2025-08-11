import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TableList } from "../../components/crud/TableList.tsx";
import Style from "../../styles/crud/table.module.scss";

interface Information {
  url: string;
  name: string;
}

export function Table() {
  const location = useLocation();
  const navigate = useNavigate();
  const information = location.state as Information;
  const { url, name } = information;

  const redirect = (): void => {
    navigate("/crud/table/create", { state: url });
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={Style.table}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className={Style.header} role="banner">
        <button
          aria-label={`Crear nuevo registro de ${name}`}
          onClick={() => redirect()}
          title={`Crear nuevo registro de ${name}`}
        >
          Crear {name}
        </button>
      </header>
      <main className={Style.main} role="main">
        <TableList url={url} />
      </main>
      <footer className={Style.footer} role="contentinfo">
        <Link title="Ir a las tablas" to="/crud/list">
          Volver
        </Link>
      </footer>
    </motion.div>
  );
}
