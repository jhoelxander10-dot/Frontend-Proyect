import { useNavigate } from "react-router-dom";
import { schoolRepository } from "../repositories/schoolRepository";
import "./SectionPage.css";

function CursosPage() {
  const navigate = useNavigate();
  const cursos = schoolRepository.getCourses();
  return <main className="section-page">
    <button className="back-button" onClick={() => navigate("/")}>← Volver al inicio</button>
    <section className="section-card">
      <h1>Mis Materias - 6A Secundaria</h1>
      <p>Materias, profesores y principales contenidos correspondientes a tu curso.</p>
      <div className="course-grid">
        {cursos.map((curso) => <article className="mini-card" key={curso.id}>
          <h2>{curso.materia}</h2><p>{curso.curso}</p><strong>{curso.profesor}</strong><span>{curso.contenidos}</span>
        </article>)}
      </div>
      {cursos.length === 0 && <p>No hay materias registradas.</p>}
    </section>
  </main>;
}
export default CursosPage;
