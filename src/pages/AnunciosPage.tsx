import { useNavigate } from "react-router-dom";
import { authRepository } from "../repositories/authRepository";
import "./AnunciosPage.css";

const anuncios = [
  {
    id: 1,
    categoria: "Comunicado escolar",
    icono: "🏫",
    titulo: "Información para la comunidad educativa",
    mensaje:
      "Consulta los comunicados de la institución y mantente atento a las indicaciones de la dirección y de tus profesores.",
    fecha: "Comunidad educativa",
  },
  {
    id: 2,
    categoria: "Académico",
    icono: "📚",
    titulo: "Actividades y evaluaciones",
    mensaje:
      "Revisa las tareas, los trabajos prácticos y las fechas de evaluación comunicadas por tus profesores para cada materia.",
    fecha: "Seguimiento académico",
  },
  {
    id: 3,
    categoria: "Convivencia escolar",
    icono: "🤝",
    titulo: "Cuidemos nuestra unidad educativa",
    mensaje:
      "Promovamos el respeto entre compañeros, el cuidado de las aulas y los materiales, y una buena convivencia dentro del colegio.",
    fecha: "Recordatorio institucional",
  },
  {
    id: 4,
    categoria: "Actividades",
    icono: "📅",
    titulo: "Actividades y reuniones del colegio",
    mensaje:
      "Para conocer las fechas de reuniones, actos cívicos y otras actividades institucionales, revisa los avisos comunicados por el colegio.",
    fecha: "Consultar comunicados",
  },
];

function AnunciosPage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();

  if (!user) {
    navigate("/login", { replace: true });
    return null;
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
            <p className="announcements-kicker">COMUNIDAD EDUCATIVA</p>
            <h1>Anuncios del colegio</h1>
            <p>Comunicados, actividades y recordatorios para los estudiantes.</p>
          </div>
        </header>

        <div className="announcements-student">
          <strong>{user.name}</strong>
          <span>{user.curso}</span>
        </div>

        <div className="announcements-note">
          <span>ℹ️</span>
          <p>
            En esta sección se reúnen avisos relacionados con la vida escolar.
            Las fechas y actividades específicas deben confirmarse mediante los
            comunicados oficiales de la institución.
          </p>
        </div>

        <div className="announcements-list">
          {anuncios.map((anuncio) => (
            <article className="announcement-card" key={anuncio.id}>
              <div className="announcement-icon" aria-hidden="true">
                {anuncio.icono}
              </div>
              <div className="announcement-content">
                <div className="announcement-meta">
                  <span className="announcement-category">
                    {anuncio.categoria}
                  </span>
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
