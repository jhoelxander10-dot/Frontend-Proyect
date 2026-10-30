import { Navigate, useNavigate } from "react-router-dom";
import { authRepository } from "../repositories/authRepository";
import "./AnunciosPage.css";

const anuncios = [
  {
    id: 1,
    categoria: "Académico",
    icono: "📚",
    titulo: "Revisa tus actividades académicas",
    mensaje: "Consulta con frecuencia el portal y las indicaciones de tus profesores para mantenerte al día con tareas, evaluaciones y trabajos.",
    fecha: "Aviso general",
  },
  {
    id: 2,
    categoria: "Recordatorio",
    icono: "🗓️",
    titulo: "Organiza tu horario",
    mensaje: "Revisa tu Plan Académico para confirmar las materias, los profesores y los horarios de cada jornada.",
    fecha: "Aviso general",
  },
  {
    id: 3,
    categoria: "Portal",
    icono: "🔔",
    titulo: "Mantén tus datos a mano",
    mensaje: "Ingresa con tu cuenta personal y revisa las secciones de Notas y Entrevistas para consultar la información que te corresponda.",
    fecha: "Aviso general",
  },
];

function AnunciosPage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="announcements-page">
      <button className="announcements-back" onClick={() => navigate("/")}>
        ← Volver al inicio
      </button>

      <section className="announcements-panel">
        <header className="announcements-heading">
          <span className="announcements-main-icon">📢</span>
          <div>
            <p className="announcements-kicker">PORTAL ACADÉMICO</p>
            <h1>Anuncios</h1>
            <p>Avisos y recordatorios importantes para los estudiantes.</p>
          </div>
        </header>

        <div className="announcements-student">
          <strong>{user.name}</strong>
          <span>{user.curso}</span>
        </div>

        <div className="announcements-note">
          <span>ℹ️</span>
          <p>Estos son avisos informativos de ejemplo para mostrar cómo funciona la sección. Puedes reemplazarlos por comunicados oficiales de tu institución.</p>
        </div>

        <div className="announcements-list">
          {anuncios.map((anuncio) => (
            <article className="announcement-card" key={anuncio.id}>
              <div className="announcement-icon" aria-hidden="true">{anuncio.icono}</div>
              <div className="announcement-content">
                <div className="announcement-meta">
                  <span className="announcement-category">{anuncio.categoria}</span>
                  <span className="announcement-date">{anuncio.fecha}</span>
                </div>
                <h2>{anuncio.titulo}</h2>
                <p>{anuncio.mensaje}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default AnunciosPage;
