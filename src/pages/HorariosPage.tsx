import { useNavigate } from "react-router-dom";
import { schoolRepository } from "../repositories/schoolRepository";
import "./SectionPage.css";

function HorariosPage() {
  const navigate = useNavigate();
  const horario = schoolRepository.getSchedule();
  return <main className="section-page">
    <button className="back-button" onClick={() => navigate("/")}>← Volver al inicio</button>
    <section className="section-card">
      <h1>Horario semanal - 6A Secundaria</h1>
      <p>Consulta tus clases, horarios y profesores asignados durante la semana.</p>
      <div className="table-wrap"><table><thead><tr><th>Día</th><th>Materia</th><th>Horario</th><th>Profesor</th></tr></thead>
        <tbody>{horario.map((item) => <tr key={item.id}><td>{item.dia}</td><td>{item.materia}</td><td>{item.hora}</td><td>{item.profesor}</td></tr>)}</tbody>
      </table></div>
      {horario.length === 0 && <p>No hay bloques horarios registrados.</p>}
    </section>
  </main>;
}
export default HorariosPage;
