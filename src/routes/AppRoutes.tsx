import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import PlanAcademicoPage from "../pages/PlanAcademicoPage";
import NotasPage from "../pages/NotasPage";
import EntrevistaPage from "../pages/EntrevistaPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/plan-academico" element={<PlanAcademicoPage />} />
        <Route path="/notas" element={<NotasPage />} />
        <Route path="/entrevista" element={<EntrevistaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
