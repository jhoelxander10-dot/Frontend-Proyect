import { useNavigate } from "react-router-dom";
import { authRepository } from "../repositories/authRepository";
import "./HomePage.css";

type IconName = "home" | "students" | "courses" | "notes" | "schedule" | "logout" | "search";

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, string> = {
    home: "M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-9ZM9 21v-6h6v6",
    students: "M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM16 4.5a3 3 0 0 1 0 6M17 15h1.5A3.5 3.5 0 0 1 22 18.5V20",
    courses: "M4 5.5 12 3l8 2.5v13L12 21l-8-2.5v-13ZM4 5.5 12 8l8-2.5M12 8v13",
    notes: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM7 8h10M7 12h10M7 16h6",
    schedule: "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM7 2v4M17 2v4M3 10h18M7 14h.01M12 14h.01M17 14h.01M7 18h.01M12 18h.01M17 18h.01",
    logout: "M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5M15 16l4-4-4-4M19 12H9",
    search: "m21 21-4.5-4.5M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z",
  };

  return <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d={paths[name]} /></svg>;
}

function HomePage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();
  const studentName = user?.name ?? "Estudiante";

  const logout = () => {
    authRepository.logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="school-app">
      <header className="school-navbar">
        <button className="school-logo" onClick={() => navigate("/")} aria-label="Ir al inicio">
          <img src="https://donboscosucre.edu.bo/logo-white.png" alt="Don Bosco Sucre" />
          <span>Don Bosco</span>
        </button>

        <nav className="school-nav" aria-label="Navegación principal">
          <button className="nav-item active" onClick={() => navigate("/")}><Icon name="home" /> <span>Inicio</span></button>
          <button className="nav-item" onClick={() => navigate("/alumnos")}><Icon name="students" /> <span>Alumnos</span></button>
          <button className="nav-item" onClick={() => navigate("/cursos")}><Icon name="courses" /> <span>Cursos</span></button>
          <button className="nav-item" onClick={() => navigate("/notas")}><Icon name="notes" /> <span>Notas</span></button>
          <button className="nav-item" onClick={() => navigate("/horarios")}><Icon name="schedule" /> <span>Horarios</span></button>
        </nav>

        <button className="logout-button" onClick={logout}><Icon name="logout" /> <span>Cerrar Sesión</span></button>
      </header>

      <main className="dashboard-main">
        <section className="welcome-panel">
          <p className="welcome-label">UNIDAD EDUCATIVA DON BOSCO · SUCRE</p>
          <h1>Portal Académico</h1>
          <p className="student-greeting">Hola <strong>{studentName}</strong>, bienvenido a tu espacio estudiantil.</p>

          <div className="dashboard-actions">
            <button className="dashboard-card" onClick={() => navigate("/alumnos")}><span className="dashboard-icon"><Icon name="search" /></span><strong>Consultar<br />Alumnos</strong><small>Ver estudiantes</small></button>
            <button className="dashboard-card" onClick={() => navigate("/cursos")}><span className="dashboard-icon"><Icon name="courses" /></span><strong>Ver Cursos</strong><small>Mis materias</small></button>
            <button className="dashboard-card" onClick={() => navigate("/notas")}><span className="dashboard-icon"><Icon name="notes" /></span><strong>Ver Mis Notas</strong><small>Mis calificaciones</small></button>
            <button className="dashboard-card" onClick={() => navigate("/horarios")}><span className="dashboard-icon"><Icon name="schedule" /></span><strong>Horarios</strong><small>Horario semanal</small></button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
