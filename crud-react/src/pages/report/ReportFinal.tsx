import { motion } from "framer-motion";
import { ReportFinalForm } from "../../components/report/ReportFinalForm.tsx";
import Style from "../../styles/report/report-final.module.scss";

export function ReportFinal() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={Style.reportFinal}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className={Style.reportFinalHeader} role="banner">
        <h1>Crear informe final</h1>
      </header>
      <main className={Style.reportFinalMain} role="main">
        <ReportFinalForm />
      </main>
    </motion.div>
  );
}
