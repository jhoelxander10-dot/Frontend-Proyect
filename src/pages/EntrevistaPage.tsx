import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EntrevistaPage.css";

function EntrevistaPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const solicitud = {
      estudiante: form.get("estudiante"),
      motivo: form.get("motivo"),
      fecha: form.get("fecha"),
      horario: form.get("horario"),
      mensaje: form.get("mensaje"),
      creadaEn: new Date().toISOString(),
    };

    localStorage.setItem("entrevista_solicitud", JSON.stringify(solicitud));
    setSubmitted(true);
    event.currentTarget.reset();
  };

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
            <h1>Solicitar entrevista</h1>
            <p>Envía una solicitud para coordinar una entrevista con la institución.</p>
          </div>
        </div>

        <form className="interview-form" onSubmit={handleSubmit}>
          <label>
            Nombre del estudiante
            <input name="estudiante" type="text" placeholder="Escribe tu nombre" required />
          </label>

          <label>
            Motivo de la entrevista
            <select name="motivo" defaultValue="" required>
              <option value="" disabled>Selecciona un motivo</option>
              <option value="academico">Tema académico</option>
              <option value="notas">Consulta sobre notas</option>
              <option value="convivencia">Convivencia escolar</option>
              <option value="otro">Otro motivo</option>
            </select>
          </label>

          <div className="interview-row">
            <label>
              Fecha preferida
              <input name="fecha" type="date" required />
            </label>
            <label>
              Horario preferido
              <select name="horario" defaultValue="" required>
                <option value="" disabled>Selecciona un horario</option>
                <option value="manana">08:00 - 10:00</option>
                <option value="media-manana">10:00 - 12:00</option>
                <option value="tarde">14:00 - 16:00</option>
              </select>
            </label>
          </div>

          <label>
            Mensaje adicional
            <textarea name="mensaje" rows={4} placeholder="Cuéntanos brevemente el motivo de tu solicitud" />
          </label>

          <button className="interview-submit" type="submit">Enviar solicitud</button>
        </form>

        {submitted && (
          <div className="interview-success" role="status">
            ✓ Solicitud registrada correctamente. La institución podrá revisar tus datos para coordinar la entrevista.
          </div>
        )}
      </section>
    </main>
  );
}

export default EntrevistaPage;
