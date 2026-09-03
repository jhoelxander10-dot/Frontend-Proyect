import { useNavigate } from "react-router-dom";
import "./SectionPage.css";

const alumnos = [
  ["001", "Jhoel", "3ro Secundaria", "Activo"],
  ["002", "María", "3ro Secundaria", "Activo"],
  ["003", "Carlos", "4to Secundaria", "Activo"],
  ["004", "Ana", "4to Secundaria", "Activo"],
];

function AlumnosPage() {
  const navigate = useNavigate();
  return (
    <main className="section-page">
      <button className="back-button" onClick={() => navigate("/")}>← Volver al inicio</button>
      <section className="section-card">
        <h1>Consultar Alumnos</h1>
        <p>Lista de estudiantes registrados en MiColegio.</p>
        <div className="table-wrap">
          <table><thead><tr><th>ID</th><th>Nombre</th><th>Curso</th><th>Estado</th></tr></thead>
          <tbody>{alumnos.map((a) => <tr key={a[0]}>{a.map((v) => <td key={v}>{v}</td>)}</tr>)}</tbody></table>
        </div>
      </section>
    </main>
  );
}
export default AlumnosPage;
