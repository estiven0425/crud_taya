import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Home } from "./pages/home/Home.tsx";
import { Crud } from "./pages/crud/Crud.tsx";
import "./styles/main.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} index />
        <Route element={<Crud />} path="crud" />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
