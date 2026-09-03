import { useNavigate } from "react-router-dom";
import "./SectionPage.css";

const horario = [
  ["Lunes", "Matemática", "08:00 - 09:30"],
  ["Martes", "Lenguaje", "08:00 - 09:30"],
  ["Miércoles", "Inglés", "09:45 - 11:15"],
  ["Jueves", "Programación", "08:00 - 09:30"],
  ["Viernes", "Educación Física", "09:45 - 11:15"],
];

function HorariosPage() {
  const navigate = useNavigate();
  return (
    <main className="section-page">
      <button className="back-button" onClick={() => navigate("/")}>← Volver al inicio</button>
      <section className="section-card">
        <h1>Horarios</h1>
        <p>Horario semanal de clases.</p>
        <div className="table-wrap"><table><thead><tr><th>Día</th><th>Materia</th><th>Horario</th></tr></thead><tbody>{horario.map((h) => <tr key={h[0]}>{h.map((v) => <td key={v}>{v}</td>)}</tr>)}</tbody></table></div>
      </section>
    </main>
  );
}
export default HorariosPage;
