import { Navigate, useNavigate } from "react-router-dom";
import { authRepository } from "../repositories/authRepository";
import "./AnunciosPage.css";

type AnnouncementIconName = "school" | "book" | "people" | "calendar" | "megaphone" | "info";

function AnnouncementIcon({ name }: { name: AnnouncementIconName }) {
  const paths: Record<AnnouncementIconName, React.ReactNode> = {
    school: (
      <>
        <path d="m3 10 9-6 9 6" />
        <path d="M5 9v10h14V9M9 19v-6h6v6M2 20h20" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z" />
        <path d="M4 5.5v13A2.5 2.5 0 0 1 6.5 16H20M8 7h8M8 10h6" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5.5a3 3 0 0 1 0 5.8M18 14a5 5 0 0 1 3 4.5V20" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 10h18M7 14h3M7 17h3M14 14h3" />
      </>
    ),
    megaphone: (
      <>
        <path d="m3 11 17-7v16L3 13zM7 14l2 6h4l-2-8M20 10h2M20 14h2" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 7h.01" />
      </>
    ),
  };

  return (
    <svg
      className="announcement-svg-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

const anuncios = [
  {
    id: 1,
    categoria: "Comunicado escolar",
    icono: "school" as const,
    titulo: "Información para la comunidad educativa",
    mensaje:
      "Consulta los comunicados de la institución y mantente atento a las indicaciones de la dirección y de tus profesores.",
    fecha: "Comunidad educativa",
  },
  {
    id: 2,
    categoria: "Académico",
    icono: "book" as const,
    titulo: "Actividades y evaluaciones",
    mensaje:
      "Revisa las tareas, los trabajos prácticos y las fechas de evaluación comunicadas por tus profesores para cada materia.",
    fecha: "Seguimiento académico",
  },
  {
    id: 3,
    categoria: "Convivencia escolar",
    icono: "people" as const,
    titulo: "Cuidemos nuestra unidad educativa",
    mensaje:
      "Promovamos el respeto entre compañeros, el cuidado de las aulas y los materiales, y una buena convivencia dentro del colegio.",
    fecha: "Recordatorio institucional",
  },
  {
    id: 4,
    categoria: "Actividades",
    icono: "calendar" as const,
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
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="announcements-page">
      <button className="announcements-back" onClick={() => navigate("/")}>
        <span aria-hidden="true">←</span> Volver al inicio
      </button>

      <section className="announcements-panel">
        <header className="announcements-heading">
          <span className="announcements-main-icon">
            <AnnouncementIcon name="megaphone" />
          </span>
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
          <AnnouncementIcon name="info" />
          <p>
            En esta sección se reúnen avisos relacionados con la vida escolar.
            Las fechas y actividades específicas deben confirmarse mediante los
            comunicados oficiales de la institución.
          </p>
        </div>

        <div className="announcements-list">
          {anuncios.map((anuncio) => (
            <article className="announcement-card" key={anuncio.id}>
              <div className={`announcement-icon announcement-icon--${anuncio.icono}`}>
                <AnnouncementIcon name={anuncio.icono} />
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
