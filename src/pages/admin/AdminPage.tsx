import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { authRepository } from "../../repositories/authRepository";
import type { User } from "../../types/auth";
import "./AdminPage.css";

type AdminSection = "resumen" | "estudiantes";

function AdminPage() {
  const navigate = useNavigate();
  const currentUser = authRepository.getCurrentUser();
  const [section, setSection] = useState<AdminSection>("resumen");
  const [search, setSearch] = useState("");

  const students = useMemo(
    () => authRepository.getAllUsers().filter((user) => user.role === "USUARIO"),
    [],
  );
  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.carnet} ${student.curso}`.toLowerCase().includes(search.toLowerCase()),
  );

  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== "ADMIN") return <Navigate to="/" replace />;

  const logout = () => {
    authRepository.logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-mark">MC</span>
          <div><strong>MiColegio</strong><small>Administración</small></div>
        </div>

        <p className="admin-nav-label">MENÚ PRINCIPAL</p>
        <button className={`admin-nav-item ${section === "resumen" ? "active" : ""}`} onClick={() => setSection("resumen")}>
          <span aria-hidden="true">▦</span> Resumen general
        </button>
        <button className={`admin-nav-item ${section === "estudiantes" ? "active" : ""}`} onClick={() => setSection("estudiantes")}>
          <span aria-hidden="true">♙</span> Estudiantes
        </button>
        <div className="admin-sidebar-note">
          <span className="admin-status-dot" />
          <div><strong>Panel administrativo</strong><small>Sesión iniciada</small></div>
        </div>
        <button className="admin-logout" onClick={logout}>↪ <span>Cerrar sesión</span></button>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div><span className="admin-eyebrow">PORTAL ACADÉMICO / ADMINISTRACIÓN</span><h1>{section === "resumen" ? "Resumen general" : "Gestión de estudiantes"}</h1></div>
          <div className="admin-profile"><span className="admin-avatar">{currentUser.name.slice(0, 1).toUpperCase()}</span><div><strong>{currentUser.name}</strong><small>Administrador</small></div></div>
        </header>

        {section === "resumen" ? (
          <>
            <section className="admin-welcome">
              <div><span className="admin-pill">PANEL DE CONTROL</span><h2>Bienvenido a la administración</h2><p>Consulta el estado general del portal y accede al directorio de estudiantes.</p></div>
              <div className="admin-welcome-icon" aria-hidden="true">▤</div>
            </section>

            <section className="admin-stat-grid" aria-label="Resumen del sistema">
              <article className="admin-stat-card"><span className="admin-stat-icon blue">♙</span><div><p>Estudiantes registrados</p><strong>{students.length}</strong><small>Cuentas estudiantiles</small></div></article>
              <article className="admin-stat-card"><span className="admin-stat-icon gold">▣</span><div><p>Roles administrativos</p><strong>{authRepository.getAllUsers().filter((user) => user.role === "ADMIN").length}</strong><small>Acceso de administración</small></div></article>
              <article className="admin-stat-card"><span className="admin-stat-icon teal">✓</span><div><p>Estado del portal</p><strong>Activo</strong><small>Interfaz de demostración</small></div></article>
            </section>

            <section className="admin-content-card">
              <div className="admin-section-heading"><div><span className="admin-eyebrow">ACCESO RÁPIDO</span><h2>Administrar el portal</h2></div></div>
              <button className="admin-action-card" onClick={() => setSection("estudiantes")}><span className="admin-action-icon">♙</span><span><strong>Directorio de estudiantes</strong><small>Consulta nombres, carnets y cursos registrados.</small></span><span className="admin-action-arrow">→</span></button>
              <div className="admin-notice"><strong>Próximos módulos</strong><p>La edición de cursos, notas, horarios y entrevistas se puede incorporar después. Esta primera versión ya incluye el acceso administrativo y el directorio de estudiantes.</p></div>
            </section>
          </>
        ) : (
          <section className="admin-content-card">
            <div className="admin-section-heading">
              <div><span className="admin-eyebrow">REGISTRO INSTITUCIONAL</span><h2>Estudiantes registrados</h2><p>Listado de las cuentas estudiantiles disponibles en este navegador.</p></div>
              <span className="admin-count">{filteredStudents.length} estudiantes</span>
            </div>
            <label className="admin-search"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por nombre, carnet o curso..." /></label>
            {filteredStudents.length ? (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Estudiante</th><th>Carnet</th><th>Curso</th><th>Tipo de cuenta</th></tr></thead>
                  <tbody>{filteredStudents.map((student: User) => <tr key={student.id}><td><span className="admin-student-name"><span className="admin-student-avatar">{student.name.slice(0, 1).toUpperCase()}</span><strong>{student.name}</strong></span></td><td>{student.carnet}</td><td>{student.curso || "Sin curso asignado"}</td><td><span className="admin-role-badge">Estudiante</span></td></tr>)}</tbody>
                </table>
              </div>
            ) : <div className="admin-empty"><strong>No se encontraron estudiantes</strong><p>Prueba con otro nombre, carnet o curso.</p></div>}
            <p className="admin-footnote">Por ahora, los datos se guardan localmente en el navegador y no se sincronizan con otros dispositivos.</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminPage;
