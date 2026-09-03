import { useNavigate } from "react-router-dom";
import "./SectionPage.css";

const cursos = [
  ["Matemática", "3ro Secundaria", "Prof. García"],
  ["Lenguaje", "3ro Secundaria", "Prof. López"],
  ["Inglés", "3ro Secundaria", "Prof. Pérez"],
  ["Programación", "3ro Secundaria", "Prof. Torres"],
];

function CursosPage() {
  const navigate = useNavigate();
  return (
    <main className="section-page">
      <button className="back-button" onClick={() => navigate("/")}>← Volver al inicio</button>
      <section className="section-card">
        <h1>Mis Cursos</h1>
        <p>Cursos disponibles para el estudiante.</p>
        <div className="course-grid">{cursos.map((c) => <article className="mini-card" key={c[0]}><h2>{c[0]}</h2><p>{c[1]}</p><span>{c[2]}</span></article>)}</div>
      </section>
    </main>
  );
}
export default CursosPage;
