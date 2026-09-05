import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import AlumnosPage from "../pages/AlumnosPage";
import CursosPage from "../pages/CursosPage";
import NotasPage from "../pages/NotasPage";
import HorariosPage from "../pages/HorariosPage";
import EntrevistaPage from "../pages/EntrevistaPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/alumnos" element={<AlumnosPage />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route path="/notas" element={<NotasPage />} />
        <Route path="/horarios" element={<HorariosPage />} />
        <Route path="/entrevista" element={<EntrevistaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
