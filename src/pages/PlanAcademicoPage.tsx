import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient, type ApiTask } from "../services/apiClient";
import "./SectionPage.css";

const materias = [
  ["Matemática", "Prof. Arnaldo", "Álgebra, ecuaciones, geometría y resolución de problemas"],
  ["Física", "Prof. Ronald", "Movimiento, fuerzas, energía y resolución de ejercicios"],
  ["Laboratorio de Química", "Prof. Erick", "Prácticas de laboratorio, sustancias y experimentación"],
  ["Química", "Prof. Erick", "Materia, elementos químicos y reacciones"],
  ["Literatura", "Prof. Mar. Isabel", "Lectura, análisis literario, autores y obras"],
  ["Gramática", "Prof. Roxana", "Ortografía, sintaxis y expresión escrita"],
  ["Sociales", "Prof. Ibert", "Historia, sociedad, ciudadanía y realidad nacional"],
  ["Biología", "Prof. Jhissel", "Seres vivos, células, genética y ecosistemas"],
  ["Artes Plásticas", "Prof. Jancko", "Dibujo, pintura y expresión artística"],
  ["Inglés", "Prof. Ricardo", "Grammar, vocabulary, reading and communication"],
  ["Cálculo", "Prof. Arnaldo", "Funciones, límites, derivadas y problemas"],
  ["Filosofía", "Prof. Patricia", "Pensamiento crítico, ética y lógica"],
  ["Laboratorio de Física", "Prof. Gonzalo", "Experimentos, mediciones y aplicaciones físicas"],
  ["Religión", "Prof. Mildred", "Valores y convivencia"],
  ["Música", "Prof. Limber", "Lenguaje musical, ritmo e interpretación"],
  ["Educación Física", "Prof. Ariel / Prof. Soledad", "Deportes, coordinación y actividades prácticas"],
];

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

function PlanAcademicoPage() {
  const navigate = useNavigate();
  const [seccion, setSeccion] = useState<"materias" | "horarios" | "calendario">("materias");
  const [tareas, setTareas] = useState<ApiTask[]>([]);
  const [cargandoTareas, setCargandoTareas] = useState(false);
  const [errorTareas, setErrorTareas] = useState("");
  const [filtroTareas, setFiltroTareas] = useState<"todas" | "pendientes" | "completadas">("todas");
  const [titulo, setTitulo] = useState("");
  const [materiaTarea, setMateriaTarea] = useState("Matemática");
  const [fechaTarea, setFechaTarea] = useState("");
  const [detalleTarea, setDetalleTarea] = useState("");

  useEffect(() => {
    let activo = true;
    setCargandoTareas(true);
    setErrorTareas("");

    apiClient.getTasks()
      .then(({ tasks }) => {
        if (activo) setTareas(tasks);
      })
      .catch((error: unknown) => {
        if (activo) {
          setTareas([]);
          setErrorTareas(error instanceof Error ? error.message : "No se pudieron cargar las tareas.");
        }
      })
      .finally(() => {
        if (activo) setCargandoTareas(false);
      });

    return () => { activo = false; };
  }, []);

  async function guardarTarea(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!titulo.trim() || !fechaTarea) return;
    setErrorTareas("");

    try {
      const { task } = await apiClient.createTask({
        title: titulo.trim(),
        subject: materiaTarea,
        dueDate: fechaTarea,
        details: detalleTarea.trim(),
      });
      setTareas((actuales) => [...actuales, task].sort((a, b) => a.dueDate.localeCompare(b.dueDate)));
      setTitulo("");
      setFechaTarea("");
      setDetalleTarea("");
    } catch (error) {
      setErrorTareas(error instanceof Error ? error.message : "No se pudo guardar la tarea.");
    }
  }

  async function eliminarTarea(id: string) {
    setErrorTareas("");
    try {
      await apiClient.deleteTask(id);
      setTareas((actuales) => actuales.filter((tarea) => tarea.id !== id));
    } catch (error) {
      setErrorTareas(error instanceof Error ? error.message : "No se pudo eliminar la tarea.");
    }
  }

  async function cambiarEstadoTarea(tarea: ApiTask) {
    setErrorTareas("");
    try {
      const { task } = await apiClient.updateTask(tarea.id, { completed: !tarea.completed });
      setTareas((actuales) => actuales.map((actual) => actual.id === task.id ? task : actual));
    } catch (error) {
      setErrorTareas(error instanceof Error ? error.message : "No se pudo actualizar la tarea.");
    }
  }

  return (
    <main className="section-page">
      <button className="back-button" onClick={() => navigate("/")}>← Volver al inicio</button>
      <section className="section-card">
        <span className="section-kicker">ORGANIZACIÓN ACADÉMICA</span>
        <h1>Mi Plan Académico</h1>
        <p>En un solo lugar puedes consultar las materias de 6A Secundaria, sus profesores, contenidos y el horario semanal de clases.</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28, marginBottom: 24 }}>
          <button
            type="button"
            onClick={() => setSeccion("materias")}
            aria-pressed={seccion === "materias"}
            style={{
              flex: "1 1 180px",
              padding: "14px 20px",
              border: "2px solid #073d76",
              borderRadius: 10,
              background: seccion === "materias" ? "#073d76" : "#ffffff",
              color: seccion === "materias" ? "#ffffff" : "#073d76",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            📚 Mis Materias
          </button>
          <button
            type="button"
            onClick={() => setSeccion("calendario")}
            aria-pressed={seccion === "calendario"}
            style={{ flex: "1 1 180px", padding: "14px 20px", border: "2px solid #073d76", borderRadius: 10, background: seccion === "calendario" ? "#073d76" : "#ffffff", color: seccion === "calendario" ? "#ffffff" : "#073d76", fontWeight: 700, cursor: "pointer" }}
          >
            📅 Calendario
          </button>
          <button
            type="button"
            onClick={() => setSeccion("horarios")}
            aria-pressed={seccion === "horarios"}
            style={{
              flex: "1 1 180px",
              padding: "14px 20px",
              border: "2px solid #073d76",
              borderRadius: 10,
              background: seccion === "horarios" ? "#073d76" : "#ffffff",
              color: seccion === "horarios" ? "#ffffff" : "#073d76",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            🗓️ Mi Horario
          </button>
        </div>

        {seccion === "materias" ? (
          <section aria-label="Mis materias y profesores">
            <h2 style={{ color: "#073d76", marginTop: 20 }}>Mis materias y profesores</h2>
            <div className="course-grid">
              {materias.map(([materia, profesor, contenidos]) => (
                <article className="mini-card" key={materia}>
                  <h2>{materia}</h2>
                  <strong>{profesor}</strong>
                  <p style={{ marginTop: 10 }}>{contenidos}</p>
                </article>
              ))}
            </div>
          </section>
        ) : seccion === "horarios" ? (
          <section aria-label="Horario semanal">
            <h2 style={{ color: "#073d76", marginTop: 20 }}>Horario semanal · 6A Secundaria</h2>
            <p>Clases organizadas por día, hora y profesor.</p>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Día</th><th>Materia</th><th>Horario</th><th>Profesor</th></tr></thead>
                <tbody>
                  {horario.map(([dia, materia, hora, profesor], index) => (
                    <tr key={index}><td>{dia}</td><td>{materia}</td><td>{hora}</td><td>{profesor}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section aria-label="Calendario de tareas">
            <h2 style={{ color: "#073d76", marginTop: 20 }}>Calendario de tareas y trabajos</h2>
            <p>Registra y administra tus tareas. Se guardan en la base de datos vinculadas a tu cuenta.</p>
            {errorTareas && <p role="alert" style={{ padding: 12, borderRadius: 8, background: "#fff1f0", color: "#a93226" }}>{errorTareas}</p>}
            {cargandoTareas && <p role="status">Cargando tus tareas...</p>}
            {!apiClient.getToken() && <p role="status" className="demo-note">Para usar el calendario necesitas iniciar sesión con el servidor MiColegio API.</p>}
            <form onSubmit={guardarTarea} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14, padding: 18, background: "#f4f8fc", borderRadius: 12, margin: "20px 0" }}>
              <label style={{ display: "grid", gap: 6, color: "#073d76", fontWeight: 600 }}>Nombre del trabajo o tarea
                <input value={titulo} onChange={(event) => setTitulo(event.target.value)} required maxLength={100} placeholder="Ej. Ejercicios de álgebra" style={{ padding: 12, border: "1px solid #c8d5e4", borderRadius: 8, font: "inherit" }} />
              </label>
              <label style={{ display: "grid", gap: 6, color: "#073d76", fontWeight: 600 }}>Materia
                <select value={materiaTarea} onChange={(event) => setMateriaTarea(event.target.value)} style={{ padding: 12, border: "1px solid #c8d5e4", borderRadius: 8, background: "#fff", font: "inherit" }}>{materias.map(([nombre]) => <option key={nombre} value={nombre}>{nombre}</option>)}</select>
              </label>
              <label style={{ display: "grid", gap: 6, color: "#073d76", fontWeight: 600 }}>Fecha de entrega
                <input type="date" value={fechaTarea} onChange={(event) => setFechaTarea(event.target.value)} required style={{ padding: 12, border: "1px solid #c8d5e4", borderRadius: 8, font: "inherit" }} />
              </label>
              <label style={{ display: "grid", gap: 6, color: "#073d76", fontWeight: 600, gridColumn: "1 / -1" }}>Detalles (opcional)
                <textarea value={detalleTarea} onChange={(event) => setDetalleTarea(event.target.value)} rows={2} maxLength={300} placeholder="Páginas, instrucciones o materiales..." style={{ padding: 12, border: "1px solid #c8d5e4", borderRadius: 8, resize: "vertical", font: "inherit" }} />
              </label>
              <button type="submit" style={{ padding: "12px 18px", border: 0, borderRadius: 8, background: "#073d76", color: "#fff", fontWeight: 700, cursor: "pointer", justifySelf: "start" }}>＋ Agregar tarea</button>
            </form>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <h3 style={{ color: "#073d76" }}>Mis tareas ({tareas.length})</h3>
              <label style={{ display: "flex", alignItems: "center", gap: 8, color: "#073d76", fontWeight: 600 }}>Mostrar
                <select value={filtroTareas} onChange={(event) => setFiltroTareas(event.target.value as "todas" | "pendientes" | "completadas")} style={{ padding: 9, border: "1px solid #c8d5e4", borderRadius: 8, background: "#fff" }}>
                  <option value="todas">Todas</option><option value="pendientes">Pendientes</option><option value="completadas">Completadas</option>
                </select>
              </label>
            </div>
            {!cargandoTareas && tareas.length === 0 ? <p style={{ padding: 18, background: "#f4f8fc", borderRadius: 10 }}>No hay tareas para mostrar. Cuando el servidor esté conectado, agrega tu primer recordatorio.</p> : (
              <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
                {tareas.filter((tarea) => filtroTareas === "todas" || (filtroTareas === "completadas" ? tarea.completed : !tarea.completed)).map((tarea) => <article key={tarea.id} style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12, padding: 16, border: "1px solid #d9e3ef", borderLeft: tarea.completed ? "5px solid #2e8b57" : "5px solid #f2c94c", borderRadius: 10 }}>
                  <div style={{ flex: "1 1 240px" }}><strong style={{ color: "#073d76", textDecoration: tarea.completed ? "line-through" : "none" }}>{tarea.title}</strong>
                    <p style={{ margin: "6px 0" }}>{tarea.subject} · Entrega: {new Date(tarea.dueDate + "T12:00:00").toLocaleDateString("es-BO", { day: "numeric", month: "long", year: "numeric" })} · {tarea.completed ? "Completada" : (tarea.dueDate < new Date().toISOString().slice(0, 10) ? "Vencida" : "Pendiente")}</p>
                    {tarea.details && <p style={{ margin: 0, color: "#526174" }}>{tarea.details}</p>}
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button type="button" onClick={() => cambiarEstadoTarea(tarea)} style={{ padding: "9px 12px", border: "1px solid #075da8", borderRadius: 8, background: "#fff", color: "#075da8", cursor: "pointer" }}>{tarea.completed ? "Reabrir" : "Completar"}</button>
                    <button type="button" onClick={() => eliminarTarea(tarea.id)} style={{ padding: "9px 12px", border: "1px solid #c0392b", borderRadius: 8, background: "#fff", color: "#a93226", cursor: "pointer" }}>Eliminar</button>
                  </div>
                </article>)}
              </div>
            )}
          </section>
        )}
      </section>
    </main>
  );
}

export default PlanAcademicoPage;
