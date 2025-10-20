import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { Crud } from "./pages/crud/Crud.tsx";
import { CrudCreate } from "./pages/crud/CrudCreate.tsx";
import { CrudList } from "./pages/crud/CrudList.tsx";
import { CrudTable } from "./pages/crud/CrudTable.tsx";
import { Home } from "./pages/home/Home.tsx";
import { Report } from "./pages/report/Report.tsx";
import { ReportFinal } from "./pages/report/ReportFinal.tsx";
import { ReportInitial } from "./pages/report/ReportInitial.tsx";
import { ReportList } from "./pages/report/ReportList.tsx";
import { ReportNovelty } from "./pages/report/ReportNovelty.tsx";
import { ReportQualityControl } from "./pages/report/ReportQualityControl.tsx";

import "./styles/main.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} index />
        <Route element={<Crud />} path="crud">
          <Route element={<CrudList />} path="list" />
          <Route element={<CrudTable />} path="table" />
          <Route element={<CrudCreate />} path="create" />
        </Route>
        <Route element={<Report />} path="report">
          <Route element={<ReportList />} path="list" />
          <Route element={<ReportInitial />} path="form_informes_iniciales" />
          <Route element={<ReportNovelty />} path="form_novedades" />
          <Route
            element={<ReportQualityControl />}
            path="form_controles_calidad"
          />
          <Route element={<ReportFinal />} path="form_informes_finales" />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
