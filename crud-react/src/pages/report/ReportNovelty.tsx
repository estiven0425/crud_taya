import { motion } from "framer-motion";

import { ReportNoveltyForm } from "../../components/report/ReportNoveltyForm.tsx";

import Style from "../../styles/report/report-novelty.module.scss";

export function ReportNovelty() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={Style.reportNovelty}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className={Style.reportNoveltyHeader} role="banner">
        <h1>Crear novedad</h1>
      </header>
      <main className={Style.reportNoveltyMain} role="main">
        <ReportNoveltyForm />
      </main>
    </motion.div>
  );
}
