import { useNavigate } from "react-router-dom";
import { authRepository } from "../repositories/authRepository";
import { entrevistasRepository } from "../repositories/entrevistasRepository";
import { notasRepository } from "../repositories/notasRepository";
import "./HomePage.css";

type IconName = "home" | "courses" | "notes" | "schedule" | "interview" | "logout";

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, string> = {
    home: "M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-9ZM9 21v-6h6v6",
    courses: "M4 5.5 12 3l8 2.5v13L12 21l-8-2.5v-13ZM4 5.5 12 8l8-2.5M12 8v13",
    notes: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM7 8h10M7 12h10M7 16h6",
    schedule: "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM7 2v4M17 2v4M3 10h18M7 14h.01M12 14h.01M17 14h.01M7 18h.01M12 18h.01M17 18h.01",
    interview: "M4 5h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2ZM7 9h10M7 13h7",
    logout: "M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5M15 16l4-4-4-4M19 12H9",
  };

  return <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d={paths[name]} /></svg>;
}

function HomePage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();

  if (!user) {
    navigate("/login", { replace: true });
    return null;
  }

  const notas = notasRepository.getForStudent(user.carnet);
  const entrevistas = entrevistasRepository.getForStudent(user.carnet);
  const promedio = notas.length
    ? (notas.reduce((total, nota) => total + nota.calificacion, 0) / notas.length).toFixed(1)
    : "0.0";
  const pendingInterviews = entrevistas.filter((entrevista) => entrevista.estado.toLowerCase() === "pendiente");
  const nextInterview = [...pendingInterviews].sort((a, b) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora))[0];

  const logout = () => {
    authRepository.logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="school-app">
      <header className="school-navbar">
        <button className="school-logo" onClick={() => navigate("/")} aria-label="Ir al inicio">
          <span>Portal Académico</span>
        </button>

        <nav className="school-nav" aria-label="Navegación principal">
          <button className="nav-item active" onClick={() => navigate("/")}><Icon name="home" /> <span>Inicio</span></button>
          <button className="nav-item" onClick={() => navigate("/cursos")}><Icon name="courses" /> <span>Cursos</span></button>
          <button className="nav-item" onClick={() => navigate("/notas")}><Icon name="notes" /> <span>Notas</span></button>
          <button className="nav-item" onClick={() => navigate("/horarios")}><Icon name="schedule" /> <span>Horarios</span></button>
          <button className="nav-item" onClick={() => navigate("/entrevista")}><Icon name="interview" /> <span>Entrevistas</span></button>
        </nav>

        <button className="logout-button" onClick={logout}><Icon name="logout" /> <span>Cerrar Sesión</span></button>
      </header>

      <main className="dashboard-main">
        <section className="welcome-panel">
          <p className="welcome-label">PORTAL ACADÉMICO</p>
          <h1>Bienvenido, {user.name}</h1>
          <p className="student-greeting">Aquí puedes consultar de forma rápida tu información académica y las actividades que la institución tiene asignadas para ti.</p>

          <div className="student-summary" aria-label="Resumen académico">
            <div><span>Estudiante</span><strong>{user.name}</strong></div>
            <div><span>Carnet</span><strong>{user.carnet}</strong></div>
            <div><span>Promedio actual</span><strong>{promedio}</strong></div>
            <div><span>Entrevistas pendientes</span><strong>{pendingInterviews.length}</strong></div>
          </div>

          <div className="dashboard-actions">
            <button className="dashboard-card" onClick={() => navigate("/cursos")}><span className="dashboard-icon"><Icon name="courses" /></span><strong>Mis Cursos</strong><small>Consultar materias</small></button>
            <button className="dashboard-card" onClick={() => navigate("/notas")}><span className="dashboard-icon"><Icon name="notes" /></span><strong>Mis Notas</strong><small>Ver calificaciones</small></button>
            <button className="dashboard-card" onClick={() => navigate("/horarios")}><span className="dashboard-icon"><Icon name="schedule" /></span><strong>Mi Horario</strong><small>Horario semanal</small></button>
            <button className="dashboard-card" onClick={() => navigate("/entrevista")}><span className="dashboard-icon"><Icon name="interview" /></span><strong>Entrevistas</strong><small>Ver llamadas asignadas</small></button>
          </div>

          <section className="next-event" aria-label="Próxima entrevista">
            <div>
              <span className="next-event-label">PRÓXIMA ACTIVIDAD INSTITUCIONAL</span>
              {nextInterview ? (
                <>
                  <h2>{nextInterview.materia} · {nextInterview.motivo}</h2>
                  <p>{nextInterview.fecha} a las {nextInterview.hora} · {nextInterview.lugar}</p>
                </>
              ) : (
                <>
                  <h2>No tienes entrevistas pendientes</h2>
                  <p>Cuando la institución asigne una, aparecerá automáticamente en esta sección.</p>
                </>
              )}
            </div>
            <button onClick={() => navigate("/entrevista")}>Ver detalles</button>
          </section>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
