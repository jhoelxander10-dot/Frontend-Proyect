import { useNavigate } from "react-router-dom";
import { authRepository } from "../repositories/authRepository";
import { notasRepository } from "../repositories/notasRepository";
import "./SectionPage.css";

function NotasPage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();

  if (!user) {
    navigate("/login", { replace: true });
    return null;
  }

  const notas = notasRepository.getForStudent(user.carnet);
  const promedio = notas.length
    ? (notas.reduce((total, nota) => total + nota.calificacion, 0) / notas.length).toFixed(1)
    : "0.0";

  return (
    <main className="section-page">
      <button className="back-button" onClick={() => navigate("/")}>← Volver al inicio</button>

      <section className="section-card">
        <div className="student-header">
          <div>
            <span className="section-kicker">PORTAL ACADÉMICO</span>
            <h1>Mis Notas</h1>
            <p><strong>{user.name}</strong> · {user.curso} · Carnet: {user.carnet}</p>
          </div>
          <div className="average-card">
            <span>Promedio</span>
            <strong>{promedio}</strong>
          </div>
        </div>

        {notas.length > 0 ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Materia</th><th>Calificación</th></tr>
              </thead>
              <tbody>
                {notas.map((nota) => (
                  <tr key={nota.materia}>
                    <td>{nota.materia}</td>
                    <td><strong>{nota.calificacion}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <h2>No hay calificaciones registradas</h2>
            <p>Cuando la institución registre tus notas, aparecerán en esta sección.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default NotasPage;
