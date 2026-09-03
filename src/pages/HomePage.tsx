import { useNavigate } from "react-router-dom";
import { authRepository } from "../repositories/authRepository";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();
  const studentName = user?.name ?? "[Nombre del Estudiante]";

  const logout = () => {
    authRepository.logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="school-app">
      <header className="school-navbar">
        <button className="school-logo" onClick={() => navigate("/")} aria-label="Ir al inicio">
          <span className="logo-house">⌂</span>
          <span>Mi<span>Colegio</span></span>
        </button>

        <nav className="school-nav">
          <button className="nav-item active" onClick={() => navigate("/")}>⌂ <span>Inicio</span></button>
          <button className="nav-item" onClick={() => navigate("/alumnos")}>♟ <span>Alumnos</span></button>
          <button className="nav-item" onClick={() => navigate("/cursos")}>▤ <span>Cursos</span></button>
          <button className="nav-item" onClick={() => navigate("/notas")}>☑ <span>Notas</span></button>
          <button className="nav-item" onClick={() => navigate("/horarios")}>▣ <span>Horarios</span></button>
        </nav>

        <button className="logout-button" onClick={logout}>⇥ <span>Cerrar Sesión</span></button>
      </header>

      <main className="dashboard-main">
        <section className="welcome-panel">
          <h1>BIENVENIDO A MICOLEGIO</h1>
          <p>Hola {studentName}</p>

          <div className="dashboard-actions">
            <button className="dashboard-card" onClick={() => navigate("/alumnos")}>
              <span className="dashboard-icon">⌕</span>
              <strong>Consultar<br />Alumnos</strong>
            </button>

            <button className="dashboard-card" onClick={() => navigate("/cursos")}>
              <span className="dashboard-icon">▤</span>
              <strong>Ver Cursos</strong>
            </button>

            <button className="dashboard-card" onClick={() => navigate("/notas")}>
              <span className="dashboard-icon">▥</span>
              <strong>Ver Mis Notas</strong>
            </button>

            <button className="dashboard-card" onClick={() => navigate("/horarios")}>
              <span className="dashboard-icon">▦</span>
              <strong>Horarios</strong>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
