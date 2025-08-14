import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CrudCreateForm } from "../../components/crud/CrudCreateForm.tsx";
import Style from "../../styles/crud/crud-create.module.scss";

interface Information {
  url: string;
  name: string;
}

export function CrudCreate() {
  const location = useLocation();
  const navigate = useNavigate();
  const information = location.state as Information;
  const { url, name } = information;

  const redirect = (): void => {
    navigate("/crud/table", { state: { url: url, name: name } });
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={Style.crudCreate}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className={Style.crudCreateHeader} role="banner">
        <h1>Nuevo registro de {name}</h1>
      </header>
      <main className={Style.crudCreateMain} role="main">
        <CrudCreateForm url={url} name={name} />
      </main>
      <footer className={Style.crudCreateFooter} role="contentinfo">
        <button
          aria-label={`Volver a la tabla de ${name}`}
          onClick={() => redirect()}
          title={`Volver a la tabla de ${name}`}
          type="button"
        >
          Volver
        </button>
      </footer>
    </motion.div>
  );
}
