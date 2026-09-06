import { useNavigate } from "react-router-dom";
import "./SectionPage.css";

const cursos = [
  ["Matemática", "6A Secundaria", "Prof. Arnaldo", "Álgebra, ecuaciones, geometría y resolución de problemas"],
  ["Física", "6A Secundaria", "Prof. Ronald", "Movimiento, fuerzas, energía y resolución de ejercicios"],
  ["Laboratorio de Química", "6A Secundaria", "Prof. Erick", "Prácticas de laboratorio, sustancias, reacciones y experimentación"],
  ["Química", "6A Secundaria", "Prof. Erick", "Materia, elementos químicos, reacciones y procesos químicos"],
  ["Literatura", "6A Secundaria", "Prof. Mar. Isabel", "Lectura, análisis literario, autores y obras"],
  ["Gramática", "6A Secundaria", "Prof. Roxana", "Ortografía, sintaxis, morfología y expresión escrita"],
  ["Sociales", "6A Secundaria", "Prof. Ibert", "Historia, sociedad, ciudadanía y realidad nacional"],
  ["Biología", "6A Secundaria", "Prof. Jhissel", "Seres vivos, células, genética, ecosistemas y salud"],
  ["Artes Plásticas", "6A Secundaria", "Prof. Jancko", "Dibujo, pintura, composición y expresión artística"],
  ["Inglés", "6A Secundaria", "Prof. Ricardo", "Grammar, vocabulary, reading comprehension and communication"],
  ["Cálculo", "6A Secundaria", "Prof. Arnaldo", "Funciones, límites, derivadas y resolución de problemas"],
  ["Filosofía", "6A Secundaria", "Prof. Patricia", "Pensamiento crítico, ética, lógica y reflexión"],
  ["Laboratorio de Física", "6A Secundaria", "Prof. Gonzalo", "Experimentos, mediciones y aplicación de conceptos físicos"],
  ["Religión", "6A Secundaria", "Prof. Mildred", "Valores, formación espiritual y convivencia"],
  ["Música", "6A Secundaria", "Prof. Limber", "Lenguaje musical, ritmo, interpretación y práctica"],
  ["Educación Física", "6A Secundaria", "Prof. Ariel / Prof. Soledad", "Deportes, coordinación, condición física y actividades prácticas"],
];

function CursosPage() {
  const navigate = useNavigate();

  return (
    <main className="section-page">
      <button className="back-button" onClick={() => navigate("/")}>← Volver al inicio</button>
      <section className="section-card">
        <h1>Mis Materias - 6A Secundaria</h1>
        <p>Materias, profesores y principales contenidos correspondientes a tu curso.</p>
        <div className="course-grid">
          {cursos.map(([materia, curso, profesor, contenidos]) => (
            <article className="mini-card" key={materia}>
              <h2>{materia}</h2>
              <p>{curso}</p>
              <strong>{profesor}</strong>
              <span>{contenidos}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default CursosPage;
