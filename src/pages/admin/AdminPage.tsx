import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { authRepository } from "../../repositories/authRepository";
import { notasRepository, trimestres, type Trimester } from "../../repositories/notasRepository";
import { entrevistasRepository, type Entrevista } from "../../repositories/entrevistasRepository";
import { announcementsRepository } from "../../repositories/announcementsRepository";
import { schoolRepository } from "../../repositories/schoolRepository";
import type { UserRecord } from "../../types/auth";
import "./AdminPage.css";

type Tab = "resumen" | "estudiantes" | "notas" | "entrevistas" | "materias" | "horarios" | "comunicados";
const emptyInterview = { materia: "", motivo: "", fecha: "", hora: "", lugar: "Sala de entrevistas", estado: "Pendiente", observacion: "" };

function AdminPage() {
  const navigate = useNavigate();
  const current = authRepository.getCurrentUser();
  const [tab, setTab] = useState<Tab>("resumen");
  const [refresh, setRefresh] = useState(0);
  const [message, setMessage] = useState("");
  const [student, setStudent] = useState({ name: "", carnet: "", curso: "6A Secundaria", password: "" });
  const [grade, setGrade] = useState({ carnet: "", trimestre: "Primer trimestre" as Trimester, materia: "Matemática", calificacion: "80" });
  const [interview, setInterview] = useState({ carnet: "", ...emptyInterview });
  const [announcement, setAnnouncement] = useState({ categoria: "Comunicado escolar", titulo: "", mensaje: "", fecha: new Date().toLocaleDateString("es-BO") });
  const [course, setCourse] = useState({ materia: "", curso: "6A Secundaria", profesor: "", contenidos: "" });
  const [schedule, setSchedule] = useState({ dia: "Lunes", materia: "", hora: "", profesor: "" });
  const users = authRepository.getAllUsers();
  const courses = schoolRepository.getCourses();
  const schedules = schoolRepository.getSchedule();
  const announcements = announcementsRepository.getAll();
  const interviews = entrevistasRepository.getAll();
  const stats = useMemo(() => ({ students: users.filter((u) => u.role === "USUARIO").length, courses: courses.length, interviews: interviews.length, announcements: announcements.length }), [refresh]);

  if (!current) return <Navigate to="/login" replace />;
  if (current.role !== "ADMIN") return <Navigate to="/" replace />;

  const done = (text: string) => { setMessage(text); setRefresh((value) => value + 1); };
  function addStudent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = authRepository.createUser({ ...student, role: "USUARIO" });
    if (!result.ok) return done(result.message);
    setStudent({ name: "", carnet: "", curso: "6A Secundaria", password: "" });
    done("Estudiante registrado correctamente.");
  }
  function saveGrade(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = Number(grade.calificacion);
    if (!grade.carnet || !Number.isFinite(value) || value < 0 || value > 100) return done("Selecciona un estudiante e ingresa una nota entre 0 y 100.");
    notasRepository.setForStudent(grade.carnet, grade.trimestre, grade.materia, value);
    done("Calificación guardada.");
  }
  function addInterview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!interview.carnet) return done("Selecciona al estudiante.");
    const { carnet, ...data } = interview;
    entrevistasRepository.addForStudent(carnet, data);
    setInterview({ carnet: "", ...emptyInterview });
    done("Entrevista asignada.");
  }
  function addAnnouncement(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    announcementsRepository.add(announcement);
    setAnnouncement({ categoria: "Comunicado escolar", titulo: "", mensaje: "", fecha: new Date().toLocaleDateString("es-BO") });
    done("Comunicado publicado.");
  }
  function addCourse(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    schoolRepository.saveCourses([...courses, { ...course, id: `course-${Date.now()}` }]);
    setCourse({ materia: "", curso: "6A Secundaria", profesor: "", contenidos: "" });
    done("Materia agregada.");
  }
  function addSchedule(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    schoolRepository.saveSchedule([...schedules, { ...schedule, id: `schedule-${Date.now()}` }]);
    setSchedule({ dia: "Lunes", materia: "", hora: "", profesor: "" });
    done("Horario agregado.");
  }
  const nav: { id: Tab; label: string }[] = [
    { id: "resumen", label: "Resumen" }, { id: "estudiantes", label: "Estudiantes" }, { id: "notas", label: "Calificaciones" },
    { id: "entrevistas", label: "Entrevistas" }, { id: "materias", label: "Materias" }, { id: "horarios", label: "Horarios" }, { id: "comunicados", label: "Comunicados" },
  ];
  return <main className="admin-page">
    <header className="admin-header">
      <div><span>MIColegio · ADMINISTRACIÓN</span><h1>Panel administrativo</h1><p>Bienvenido, {current.name}</p></div>
      <button onClick={() => navigate("/")}>← Volver al portal</button>
    </header>
    <div className="admin-layout">
      <aside className="admin-sidebar" aria-label="Secciones administrativas">
        {nav.map((item) => <button key={item.id} className={tab === item.id ? "active" : ""} onClick={() => { setTab(item.id); setMessage(""); }}>{item.label}</button>)}
      </aside>
      <section className="admin-content">
        {message && <p className="admin-message" role="status">{message}</p>}
        {tab === "resumen" && <>
          <h2>Resumen general</h2><p className="admin-muted">Administración de los módulos principales del portal.</p>
          <div className="admin-stats"><article><span>Estudiantes</span><strong>{stats.students}</strong></article><article><span>Materias</span><strong>{stats.courses}</strong></article><article><span>Entrevistas</span><strong>{stats.interviews}</strong></article><article><span>Comunicados</span><strong>{stats.announcements}</strong></article></div>
          <div className="admin-warning"><strong>Almacenamiento local</strong><p>Los cambios se guardan en el navegador actual. No se sincronizan con otros dispositivos ni constituyen una base de datos institucional compartida.</p></div>
        </>}
        {tab === "estudiantes" && <>
          <h2>Gestión de estudiantes y usuarios</h2>
          <form className="admin-form" onSubmit={addStudent}><label>Nombre completo<input value={student.name} onChange={e=>setStudent({...student,name:e.target.value})} required /></label><label>Carnet<input value={student.carnet} onChange={e=>setStudent({...student,carnet:e.target.value})} required /></label><label>Curso<input value={student.curso} onChange={e=>setStudent({...student,curso:e.target.value})} required /></label><label>Contraseña inicial<input type="password" minLength={6} value={student.password} onChange={e=>setStudent({...student,password:e.target.value})} required /></label><button type="submit">＋ Registrar estudiante</button></form>
          <div className="admin-list">{users.map((user: UserRecord)=><article key={user.id}><div><strong>{user.name}</strong><small>{user.carnet} · {user.curso} · {user.role}</small></div><div className="admin-actions">{user.id !== current.id && <><button onClick={()=>{const role=user.role==="ADMIN"?"USUARIO":"ADMIN"; if(role==="USUARIO" && users.filter(u=>u.role==="ADMIN").length===1) return done("Debe existir al menos un administrador."); authRepository.updateUserRole(user.id,role); done("Rol actualizado.");}}>{user.role==="ADMIN"?"Quitar admin":"Hacer admin"}</button><button className="danger" onClick={()=>{if(window.confirm(`¿Eliminar la cuenta de ${user.name}?`)){authRepository.deleteUser(user.id);done("Usuario eliminado.");}}}>Eliminar</button></>}</div></article>)}</div>
        </>}
        {tab === "notas" && <>
          <h2>Registro de calificaciones</h2><form className="admin-form" onSubmit={saveGrade}><label>Estudiante<select value={grade.carnet} onChange={e=>setGrade({...grade,carnet:e.target.value})} required><option value="">Seleccionar estudiante</option>{users.filter(u=>u.role==="USUARIO").map(u=><option key={u.id} value={u.carnet}>{u.name} · {u.carnet}</option>)}</select></label><label>Trimestre<select value={grade.trimestre} onChange={e=>setGrade({...grade,trimestre:e.target.value as Trimester})}>{trimestres.map(t=><option key={t}>{t}</option>)}</select></label><label>Materia<input value={grade.materia} onChange={e=>setGrade({...grade,materia:e.target.value})} required /></label><label>Calificación (0–100)<input type="number" min="0" max="100" value={grade.calificacion} onChange={e=>setGrade({...grade,calificacion:e.target.value})} required /></label><button type="submit">Guardar calificación</button></form>
          <p className="admin-muted">Las notas guardadas se mostrarán en la sección «Mis Notas» del estudiante.</p>
        </>}
        {tab === "entrevistas" && <>
          <h2>Asignar entrevista</h2><form className="admin-form" onSubmit={addInterview}><label>Estudiante<select value={interview.carnet} onChange={e=>setInterview({...interview,carnet:e.target.value})} required><option value="">Seleccionar estudiante</option>{users.filter(u=>u.role==="USUARIO").map(u=><option key={u.id} value={u.carnet}>{u.name} · {u.carnet}</option>)}</select></label><label>Materia<input value={interview.materia} onChange={e=>setInterview({...interview,materia:e.target.value})} required /></label><label>Motivo<input value={interview.motivo} onChange={e=>setInterview({...interview,motivo:e.target.value})} required /></label><label>Fecha<input type="date" value={interview.fecha} onChange={e=>setInterview({...interview,fecha:e.target.value})} required /></label><label>Hora<input type="time" value={interview.hora} onChange={e=>setInterview({...interview,hora:e.target.value})} required /></label><label>Lugar<input value={interview.lugar} onChange={e=>setInterview({...interview,lugar:e.target.value})} required /></label><label className="wide">Observación<textarea value={interview.observacion} onChange={e=>setInterview({...interview,observacion:e.target.value})} /></label><button type="submit">Asignar entrevista</button></form>
          <div className="admin-list">{interviews.map((item: Entrevista & { carnet: string })=><article key={item.id}><div><strong>{item.materia} · {item.estado}</strong><small>{users.find(u=>u.carnet===item.carnet)?.name ?? item.carnet} · {item.fecha} · {item.hora}</small></div><button className="danger" onClick={()=>{entrevistasRepository.remove(item.carnet,item.id);done("Entrevista eliminada.");}}>Eliminar</button></article>)}</div>
        </>}
        {tab === "materias" && <>
          <h2>Gestión de materias</h2><form className="admin-form" onSubmit={addCourse}><label>Materia<input value={course.materia} onChange={e=>setCourse({...course,materia:e.target.value})} required /></label><label>Curso<input value={course.curso} onChange={e=>setCourse({...course,curso:e.target.value})} required /></label><label>Profesor<input value={course.profesor} onChange={e=>setCourse({...course,profesor:e.target.value})} required /></label><label>Contenidos<input value={course.contenidos} onChange={e=>setCourse({...course,contenidos:e.target.value})} required /></label><button type="submit">Agregar materia</button></form><div className="admin-list">{courses.map(c=><article key={c.id}><div><strong>{c.materia}</strong><small>{c.curso} · {c.profesor}</small></div><button className="danger" onClick={()=>{schoolRepository.saveCourses(courses.filter(x=>x.id!==c.id));done("Materia eliminada.");}}>Eliminar</button></article>)}</div>
        </>}
        {tab === "horarios" && <>
          <h2>Gestión de horarios</h2><form className="admin-form" onSubmit={addSchedule}><label>Día<select value={schedule.dia} onChange={e=>setSchedule({...schedule,dia:e.target.value})}>{["Lunes","Martes","Miércoles","Jueves","Viernes"].map(d=><option key={d}>{d}</option>)}</select></label><label>Materia<input value={schedule.materia} onChange={e=>setSchedule({...schedule,materia:e.target.value})} required /></label><label>Horario<input placeholder="08:00 - 08:40" value={schedule.hora} onChange={e=>setSchedule({...schedule,hora:e.target.value})} required /></label><label>Profesor<input value={schedule.profesor} onChange={e=>setSchedule({...schedule,profesor:e.target.value})} required /></label><button type="submit">Agregar bloque horario</button></form><div className="admin-list">{schedules.map(s=><article key={s.id}><div><strong>{s.dia} · {s.materia}</strong><small>{s.hora} · {s.profesor}</small></div><button className="danger" onClick={()=>{schoolRepository.saveSchedule(schedules.filter(x=>x.id!==s.id));done("Bloque horario eliminado.");}}>Eliminar</button></article>)}</div>
        </>}
        {tab === "comunicados" && <>
          <h2>Publicar comunicado</h2><form className="admin-form" onSubmit={addAnnouncement}><label>Categoría<input value={announcement.categoria} onChange={e=>setAnnouncement({...announcement,categoria:e.target.value})} required /></label><label>Título<input value={announcement.titulo} onChange={e=>setAnnouncement({...announcement,titulo:e.target.value})} required /></label><label className="wide">Mensaje<textarea value={announcement.mensaje} onChange={e=>setAnnouncement({...announcement,mensaje:e.target.value})} required /></label><label>Fecha o referencia<input value={announcement.fecha} onChange={e=>setAnnouncement({...announcement,fecha:e.target.value})} required /></label><button type="submit">Publicar comunicado</button></form><div className="admin-list">{announcements.map(a=><article key={a.id}><div><strong>{a.titulo}</strong><small>{a.categoria} · {a.fecha}</small></div><button className="danger" onClick={()=>{announcementsRepository.remove(a.id);done("Comunicado eliminado.");}}>Eliminar</button></article>)}</div>
        </>}
      </section>
    </div>
  </main>;
}
export default AdminPage;
