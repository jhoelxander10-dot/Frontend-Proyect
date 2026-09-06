import { useNavigate } from "react-router-dom";
import "./SectionPage.css";

const cursos = [
  ["Matemática", "3ro Secundaria", "Prof. García", "Álgebra, ecuaciones, geometría y resolución de problemas"],
  ["Lengua Castellana", "3ro Secundaria", "Prof. López", "Comprensión lectora, gramática, literatura y expresión escrita"],
  ["Inglés", "3ro Secundaria", "Prof. Pérez", "Grammar, vocabulary, reading comprehension and communication"],
  ["Programación", "3ro Secundaria", "Prof. Torres", "HTML, CSS, JavaScript, TypeScript y desarrollo web"],
  ["Ciencias Naturales", "3ro Secundaria", "Prof. Fernández", "Biología, ecosistemas, materia y método científico"],
  ["Física", "3ro Secundaria", "Prof. Rodríguez", "Movimiento, fuerzas, energía y resolución de ejercicios"],
  ["Química", "3ro Secundaria", "Prof. Martínez", "Materia, elementos químicos, reacciones y laboratorio"],
  ["Historia y Geografía", "3ro Secundaria", "Prof. Vargas", "Historia de Bolivia, geografía, sociedad y territorio"],
  ["Educación Física", "3ro Secundaria", "Prof. Castillo", "Condición física, deportes, coordinación y hábitos saludables"],
];

function CursosPage() {
  const navigate = useNavigate();

  return (
    <main className="section-page">
      <button className="back-button" onClick={() => navigate("/")}>← Volver al inicio</button>
      <section className="section-card">
        <h1>Mis Materias</h1>
        <p>Materias que forman parte de tu horario académico y sus principales contenidos.</p>
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
