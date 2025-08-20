import { motion } from "framer-motion";
import { ReportQualityControlForm } from "../../components/report/ReportQualityControlForm.tsx";
import Style from "../../styles/report/report-quality-control.module.scss";

export function ReportQualityControl() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={Style.reportQualityControl}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className={Style.reportQualityControlHeader} role="banner">
        <h1>Crear control de calidad</h1>
      </header>
      <main className={Style.reportQualityControlMain} role="main">
        <ReportQualityControlForm />
      </main>
    </motion.div>
  );
}
