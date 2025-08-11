import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Crud } from "./pages/crud/Crud.tsx";
import { Home } from "./pages/home/Home.tsx";
import { List } from "./pages/crud/List.tsx";
import { Table } from "./pages/crud/Table.tsx";
import "./styles/main.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} index />
        <Route element={<Crud />} path="crud">
          <Route element={<List />} path="list" />
          <Route element={<Table />} path="table" />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
