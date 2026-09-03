import { useNavigate } from "react-router-dom";
import "./SectionPage.css";

const notas = [
  ["Matemática", "88"],
  ["Lenguaje", "92"],
  ["Inglés", "95"],
  ["Programación", "98"],
];

function NotasPage() {
  const navigate = useNavigate();
  return (
    <main className="section-page">
      <button className="back-button" onClick={() => navigate("/")}>← Volver al inicio</button>
      <section className="section-card">
        <h1>Mis Notas</h1>
        <p>Consulta tus calificaciones por materia.</p>
        <div className="table-wrap"><table><thead><tr><th>Materia</th><th>Calificación</th></tr></thead><tbody>{notas.map((n) => <tr key={n[0]}><td>{n[0]}</td><td><strong>{n[1]}</strong></td></tr>)}</tbody></table></div>
      </section>
    </main>
  );
}
export default NotasPage;
