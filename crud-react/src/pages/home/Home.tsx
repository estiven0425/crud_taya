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
      <header className={Style.header} role="banner">
        <h1>CRUD TAYA</h1>
      </header>
      <main className={Style.main} role="main">
        <section>
          <Link to="/crud">CRUD</Link>
        </section>
        <section>
          <Link to="/report">Informes</Link>
        </section>
      </main>
      <footer className={Style.footer} role="contentinfo">
        <p>
          © {year} TAYA <span>todos los derechos reservados</span>
        </p>
        <p>TALCOS de Yarumal - TAYA</p>
        <a href={softwareUrl} rel="noopener noreferrer" target="_blank">
          Software principal
        </a>
      </footer>
    </motion.div>
  );
}
