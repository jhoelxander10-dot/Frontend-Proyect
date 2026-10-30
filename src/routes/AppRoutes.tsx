import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import PlanAcademicoPage from "../pages/PlanAcademicoPage";
import CursosPage from "../pages/CursosPage";
import HorariosPage from "../pages/HorariosPage";
import NotasPage from "../pages/NotasPage";
import EntrevistaPage from "../pages/EntrevistaPage";
import AnunciosPage from "../pages/AnunciosPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/plan-academico" element={<PlanAcademicoPage />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route path="/horarios" element={<HorariosPage />} />
        <Route path="/notas" element={<NotasPage />} />
        <Route path="/entrevista" element={<EntrevistaPage />} />
        <Route path="/anuncios" element={<AnunciosPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
