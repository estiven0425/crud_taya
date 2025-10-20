import { motion } from "framer-motion";

import { ReportInitialForm } from "../../components/report/ReportInitialForm.tsx";

import Style from "../../styles/report/report-initial.module.scss";

export function ReportInitial() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={Style.reportInitial}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className={Style.reportInitialHeader} role="banner">
        <h1>Crear informe inicial</h1>
      </header>
      <main className={Style.reportInitialMain} role="main">
        <ReportInitialForm />
      </main>
    </motion.div>
  );
}
