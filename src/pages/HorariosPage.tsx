import { useNavigate } from "react-router-dom";
import "./SectionPage.css";

const horario = [
  ["Lunes", "Matemática", "08:00 - 09:00", "Aula 3A"],
  ["Lunes", "Lengua Castellana", "09:00 - 10:00", "Aula 3A"],
  ["Lunes", "Inglés", "10:15 - 11:15", "Aula 3A"],
  ["Lunes", "Ciencias Naturales", "11:15 - 12:15", "Laboratorio"],
  ["Martes", "Historia y Geografía", "08:00 - 09:00", "Aula 3A"],
  ["Martes", "Física", "09:00 - 10:00", "Laboratorio"],
  ["Martes", "Programación", "10:15 - 11:15", "Sala de Computación"],
  ["Martes", "Educación Física", "11:15 - 12:15", "Cancha"],
  ["Miércoles", "Química", "08:00 - 09:00", "Laboratorio"],
  ["Miércoles", "Matemática", "09:00 - 10:00", "Aula 3A"],
  ["Miércoles", "Lengua Castellana", "10:15 - 11:15", "Aula 3A"],
  ["Miércoles", "Inglés", "11:15 - 12:15", "Aula 3A"],
  ["Jueves", "Programación", "08:00 - 09:00", "Sala de Computación"],
  ["Jueves", "Física", "09:00 - 10:00", "Laboratorio"],
  ["Jueves", "Ciencias Naturales", "10:15 - 11:15", "Laboratorio"],
  ["Jueves", "Educación Física", "11:15 - 12:15", "Cancha"],
  ["Viernes", "Matemática", "08:00 - 09:00", "Aula 3A"],
  ["Viernes", "Historia y Geografía", "09:00 - 10:00", "Aula 3A"],
  ["Viernes", "Química", "10:15 - 11:15", "Laboratorio"],
  ["Viernes", "Programación", "11:15 - 12:15", "Sala de Computación"],
];

function HorariosPage() {
  const navigate = useNavigate();

  return (
    <main className="section-page">
      <button className="back-button" onClick={() => navigate("/")}>← Volver al inicio</button>
      <section className="section-card">
        <h1>Horario semanal</h1>
        <p>Consulta tus clases, horarios y aulas asignadas durante la semana.</p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Día</th><th>Materia</th><th>Horario</th><th>Aula</th></tr>
            </thead>
            <tbody>
              {horario.map(([dia, materia, hora, aula], index) => (
                <tr key={`${dia}-${materia}-${index}`}>
                  <td>{dia}</td><td>{materia}</td><td>{hora}</td><td>{aula}</td>
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
