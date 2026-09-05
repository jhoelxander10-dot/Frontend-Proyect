import { useNavigate } from "react-router-dom";
import { authRepository } from "../repositories/authRepository";
import { entrevistasRepository } from "../repositories/entrevistasRepository";
import "./EntrevistaPage.css";

function EntrevistaPage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();

  if (!user) {
    navigate("/login", { replace: true });
    return null;
  }

  const entrevistas = entrevistasRepository.getForStudent(user.carnet);

  return (
    <main className="interview-page">
      <button className="interview-back" onClick={() => navigate("/")}>
        ← Volver al inicio
      </button>

      <section className="interview-card">
        <div className="interview-heading">
          <span className="interview-icon">💬</span>
          <div>
            <p className="interview-kicker">PORTAL ACADÉMICO</p>
            <h1>Mis Entrevistas</h1>
            <p>
              Aquí puedes consultar las materias o motivos por los que la institución te ha llamado a una entrevista.
            </p>
          </div>
        </div>

        <div className="student-interview-info">
          <strong>{user.name}</strong>
          <span>Carnet: {user.carnet}</span>
        </div>

        {entrevistas.length === 0 ? (
          <div className="interview-empty">
            <span>✓</span>
            <h2>No tienes entrevistas asignadas</h2>
            <p>Cuando la institución te asigne una entrevista, aparecerá aquí con la materia, motivo, fecha y hora.</p>
          </div>
        ) : (
          <div className="interview-list">
            {entrevistas.map((entrevista) => (
              <article className="assigned-interview" key={entrevista.id}>
                <div className="assigned-interview-header">
                  <div>
                    <span className="interview-label">MATERIA</span>
                    <h2>{entrevista.materia}</h2>
                  </div>
                  <span className="interview-status">{entrevista.estado}</span>
                </div>

                <div className="interview-details">
                  <div><span>Motivo</span><strong>{entrevista.motivo}</strong></div>
                  <div><span>Fecha</span><strong>{entrevista.fecha}</strong></div>
                  <div><span>Hora</span><strong>{entrevista.hora}</strong></div>
                  <div><span>Lugar</span><strong>{entrevista.lugar}</strong></div>
                </div>

                <div className="interview-observation">
                  <span>Información</span>
                  <p>{entrevista.observacion}</p>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="interview-demo-note">
          Las entrevistas mostradas son asignadas por la institución. El estudiante solo consulta la información correspondiente a su cuenta.
        </p>
      </section>
    </main>
  );
}

export default EntrevistaPage;
