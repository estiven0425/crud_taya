import { getYear } from "date-fns";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Style from "../../styles/home/home.module.scss";

export function Home() {
  const year: number = getYear(new Date());

  const softwareUrl: string = import.meta.env.VITE_SOFTWARE_URL;

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={Style.home}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className={Style.homeHeader} role="banner">
        <h1>CRUD TAYA</h1>
      </header>
      <main className={Style.homeMain} role="main">
        <Link title="Ir a manejar la base de datos" to="/crud/list">
          CRUD
        </Link>
        <Link title="Ir a generar informes" to="/report/list">
          Informes
        </Link>
      </main>
      <footer className={Style.homeFooter} role="contentinfo">
        <p>
          © {year} TAYA <span>todos los derechos reservados</span>
        </p>
        <p>TALCOS de Yarumal - TAYA</p>
        <a
          href={softwareUrl}
          rel="noopener noreferrer"
          target="_blank"
          title="Ir al software principal"
        >
          Software principal
        </a>
      </footer>
    </motion.div>
  );
}
