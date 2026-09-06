import { useNavigate } from "react-router-dom";
import "./SectionPage.css";

const horario = [
  ["Lunes", "Matemática", "08:00 - 08:40", "Prof. Arnaldo"],
  ["Lunes", "Matemática", "08:40 - 09:20", "Prof. Arnaldo"],
  ["Lunes", "Matemática", "09:20 - 10:00", "Prof. Arnaldo"],
  ["Lunes", "Literatura", "10:00 - 10:40", "Prof. Mar. Isabel"],
  ["Lunes", "Gramática", "11:00 - 11:40", "Prof. Roxana"],
  ["Lunes", "Química", "11:40 - 12:20", "Prof. Erick"],
  ["Lunes", "Química", "12:20 - 12:55", "Prof. Erick"],
  ["Martes", "Física", "08:00 - 08:40", "Prof. Ronald"],
  ["Martes", "Física", "08:40 - 09:20", "Prof. Ronald"],
  ["Martes", "Laboratorio de Química", "09:20 - 10:00", "Prof. Erick"],
  ["Martes", "Laboratorio de Química", "10:00 - 10:40", "Prof. Erick"],
  ["Martes", "Matemática", "11:00 - 11:40", "Prof. Arnaldo"],
  ["Martes", "Matemática", "11:40 - 12:20", "Prof. Arnaldo"],
  ["Martes", "Sociales", "12:20 - 12:55", "Prof. Ibert"],
  ["Miércoles", "Matemática", "08:00 - 08:40", "Prof. Arnaldo"],
  ["Miércoles", "Matemática", "08:40 - 09:20", "Prof. Arnaldo"],
  ["Miércoles", "Química", "09:20 - 10:00", "Prof. Erick"],
  ["Miércoles", "Química", "10:00 - 10:40", "Prof. Erick"],
  ["Miércoles", "Biología", "11:00 - 11:40", "Prof. Jhissel"],
  ["Miércoles", "Artes Plásticas", "11:40 - 12:20", "Prof. Jancko"],
  ["Miércoles", "Artes Plásticas", "12:20 - 12:55", "Prof. Jancko"],
  ["Jueves", "Inglés", "08:00 - 08:40", "Prof. Ricardo"],
  ["Jueves", "Inglés", "08:40 - 09:20", "Prof. Ricardo"],
  ["Jueves", "Cálculo", "09:20 - 10:00", "Prof. Arnaldo"],
  ["Jueves", "Cálculo", "10:00 - 10:40", "Prof. Arnaldo"],
  ["Jueves", "Filosofía", "11:00 - 11:40", "Prof. Patricia"],
  ["Jueves", "Laboratorio de Física", "11:40 - 12:20", "Prof. Gonzalo"],
  ["Jueves", "Laboratorio de Física", "12:20 - 12:55", "Prof. Gonzalo"],
  ["Viernes", "Física", "08:00 - 08:40", "Prof. Ronald"],
  ["Viernes", "Física", "08:40 - 09:20", "Prof. Ronald"],
  ["Viernes", "Religión", "09:20 - 10:00", "Prof. Mildred"],
  ["Viernes", "Religión", "10:00 - 10:40", "Prof. Mildred"],
  ["Viernes", "Música", "11:00 - 11:40", "Prof. Limber"],
  ["Viernes", "Educación Física", "11:40 - 12:20", "Prof. Ariel"],
  ["Viernes", "Educación Física", "12:20 - 12:55", "Prof. Soledad"],
];

function HorariosPage() {
  const navigate = useNavigate();

  return (
    <main className="section-page">
      <button className="back-button" onClick={() => navigate("/")}>← Volver al inicio</button>
      <section className="section-card">
        <h1>Horario semanal - 6A Secundaria</h1>
        <p>Consulta tus clases, horarios y profesores asignados durante la semana.</p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Día</th><th>Materia</th><th>Horario</th><th>Profesor</th></tr>
            </thead>
            <tbody>
              {horario.map(([dia, materia, hora, profesor], index) => (
                <tr key={`${dia}-${materia}-${hora}-${index}`}>
                  <td>{dia}</td><td>{materia}</td><td>{hora}</td><td>{profesor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default HorariosPage;
