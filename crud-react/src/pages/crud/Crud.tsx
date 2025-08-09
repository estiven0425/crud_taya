import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Style from "../../styles/crud/crud.module.scss";

export function Crud() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={Style.crud}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className={Style.header} role="banner">
        <h1>Tablas de la base de datos</h1>
      </header>
      <main className={Style.main} role="main">
        <Link to="/crud/bobcats">Bob Cats</Link>
        <Link to="/crud/bultos">Bultos</Link>
        <Link to="/crud/controlescalidad">Controles de Calidad</Link>
        <Link to="/crud/despachoscomerciales">Despachos comerciales</Link>
        <Link to="/crud/despachos">Despachos</Link>
        <Link to="/crud/informesfinales">Informes finales</Link>
        <Link to="/crud/informesiniciales">Informes iniciales</Link>
        <Link to="/crud/inventariosap">Inventarios AP</Link>
        <Link to="/crud/materiasprimas">Materias Primas</Link>
        <Link to="/crud/mensajes">Mensajes</Link>
        <Link to="/crud/molinos">Molinos</Link>
        <Link to="/crud/molinosap">Molinos AP</Link>
        <Link to="/crud/novedades">Novedades</Link>
        <Link to="/crud/perfiles">Perfiles</Link>
        <Link to="/crud/presupuestoscomerciales">Presupuestos Comerciales</Link>
        <Link to="/crud/productosrechazados">Productos rechazado</Link>
        <Link to="/crud/referencias">Referencias</Link>
        <Link to="/crud/registros">Registros</Link>
        <Link to="/crud/registrosap">Registros AP</Link>
        <Link to="/crud/turnos">Turnos</Link>
        <Link to="/crud/usuarios">Usuarios</Link>
      </main>
      <footer className={Style.footer} role="contentinfo">
        <Link to="/">Volver</Link>
      </footer>
    </motion.div>
  );
}
