import { storageService } from "../services/storageService";

export interface SchoolCourse {
  id: string;
  materia: string;
  curso: string;
  profesor: string;
  contenidos: string;
}
export interface SchoolSchedule {
  id: string;
  dia: string;
  materia: string;
  hora: string;
  profesor: string;
}
const COURSES_KEY = "school_courses";
const SCHEDULE_KEY = "school_schedule";
const defaultCourses: SchoolCourse[] = [
  ["Matemática","Prof. Arnaldo","Álgebra, ecuaciones, geometría y resolución de problemas"],
  ["Física","Prof. Ronald","Movimiento, fuerzas, energía y resolución de ejercicios"],
  ["Laboratorio de Química","Prof. Erick","Prácticas de laboratorio, sustancias y experimentación"],
  ["Química","Prof. Erick","Materia, elementos químicos y reacciones"],
  ["Literatura","Prof. Mar. Isabel","Lectura, análisis literario, autores y obras"],
  ["Gramática","Prof. Roxana","Ortografía, sintaxis y expresión escrita"],
  ["Sociales","Prof. Ibert","Historia, sociedad, ciudadanía y realidad nacional"],
  ["Biología","Prof. Jhissel","Seres vivos, células, genética y ecosistemas"],
  ["Artes Plásticas","Prof. Jancko","Dibujo, pintura y expresión artística"],
  ["Inglés","Prof. Ricardo","Grammar, vocabulary, reading and communication"],
  ["Cálculo","Prof. Arnaldo","Funciones, límites, derivadas y problemas"],
  ["Filosofía","Prof. Patricia","Pensamiento crítico, ética y lógica"],
  ["Laboratorio de Física","Prof. Gonzalo","Experimentos, mediciones y aplicaciones físicas"],
  ["Religión","Prof. Mildred","Valores y convivencia"],
  ["Música","Prof. Limber","Lenguaje musical, ritmo e interpretación"],
  ["Educación Física","Prof. Ariel / Prof. Soledad","Deportes, coordinación y actividades prácticas"],
].map(([materia, profesor, contenidos], index) => ({ id: `course-${index + 1}`, materia, curso: "6A Secundaria", profesor, contenidos }));
const defaultSchedule: SchoolSchedule[] = [
  ["Lunes","Matemática","08:00 - 08:40","Prof. Arnaldo"],["Lunes","Matemática","08:40 - 09:20","Prof. Arnaldo"],["Lunes","Matemática","09:20 - 10:00","Prof. Arnaldo"],["Lunes","Literatura","10:00 - 10:40","Prof. Mar. Isabel"],["Lunes","Gramática","11:00 - 11:40","Prof. Roxana"],["Lunes","Química","11:40 - 12:20","Prof. Erick"],["Lunes","Química","12:20 - 12:55","Prof. Erick"],
  ["Martes","Física","08:00 - 08:40","Prof. Ronald"],["Martes","Física","08:40 - 09:20","Prof. Ronald"],["Martes","Laboratorio de Química","09:20 - 10:00","Prof. Erick"],["Martes","Laboratorio de Química","10:00 - 10:40","Prof. Erick"],["Martes","Matemática","11:00 - 11:40","Prof. Arnaldo"],["Martes","Matemática","11:40 - 12:20","Prof. Arnaldo"],["Martes","Sociales","12:20 - 12:55","Prof. Ibert"],
  ["Miércoles","Matemática","08:00 - 08:40","Prof. Arnaldo"],["Miércoles","Matemática","08:40 - 09:20","Prof. Arnaldo"],["Miércoles","Química","09:20 - 10:00","Prof. Erick"],["Miércoles","Química","10:00 - 10:40","Prof. Erick"],["Miércoles","Biología","11:00 - 11:40","Prof. Jhissel"],["Miércoles","Artes Plásticas","11:40 - 12:20","Prof. Jancko"],["Miércoles","Artes Plásticas","12:20 - 12:55","Prof. Jancko"],
  ["Jueves","Inglés","08:00 - 08:40","Prof. Ricardo"],["Jueves","Inglés","08:40 - 09:20","Prof. Ricardo"],["Jueves","Cálculo","09:20 - 10:00","Prof. Arnaldo"],["Jueves","Cálculo","10:00 - 10:40","Prof. Arnaldo"],["Jueves","Filosofía","10:00 - 10:40","Prof. Patricia"],["Jueves","Laboratorio de Física","11:40 - 12:20","Prof. Gonzalo"],["Jueves","Laboratorio de Física","12:20 - 12:55","Prof. Gonzalo"],
  ["Viernes","Física","08:00 - 08:40","Prof. Ronald"],["Viernes","Física","08:40 - 09:20","Prof. Ronald"],["Viernes","Religión","09:20 - 10:00","Prof. Mildred"],["Viernes","Religión","10:00 - 10:40","Prof. Mildred"],["Viernes","Música","11:00 - 11:40","Prof. Limber"],["Viernes","Educación Física","11:40 - 12:20","Prof. Ariel"],["Viernes","Educación Física","12:20 - 12:55","Prof. Soledad"],
].map(([dia,materia,hora,profesor], index) => ({ id: `schedule-${index + 1}`, dia, materia, hora, profesor }));
export const schoolRepository = {
  getCourses(): SchoolCourse[] { return storageService.get<SchoolCourse[]>(COURSES_KEY) ?? defaultCourses; },
  saveCourses(items: SchoolCourse[]): void { storageService.set(COURSES_KEY, items); },
  getSchedule(): SchoolSchedule[] { return storageService.get<SchoolSchedule[]>(SCHEDULE_KEY) ?? defaultSchedule; },
  saveSchedule(items: SchoolSchedule[]): void { storageService.set(SCHEDULE_KEY, items); },
};
