import { storageService } from "../services/storageService";

export interface Announcement {
  id: string;
  categoria: string;
  titulo: string;
  mensaje: string;
  fecha: string;
}

const KEY = "school_announcements";
const defaults: Announcement[] = [
  { id: "announcement-1", categoria: "Comunicado escolar", titulo: "Información para la comunidad educativa", mensaje: "Consulta los comunicados de la institución y mantente atento a las indicaciones de la dirección y de tus profesores.", fecha: "Comunidad educativa" },
  { id: "announcement-2", categoria: "Académico", titulo: "Actividades y evaluaciones", mensaje: "Revisa las tareas, los trabajos prácticos y las fechas de evaluación comunicadas por tus profesores para cada materia.", fecha: "Seguimiento académico" },
  { id: "announcement-3", categoria: "Convivencia escolar", titulo: "Cuidemos nuestra unidad educativa", mensaje: "Promovamos el respeto entre compañeros, el cuidado de las aulas y los materiales, y una buena convivencia dentro del colegio.", fecha: "Recordatorio institucional" },
  { id: "announcement-4", categoria: "Actividades", titulo: "Actividades y reuniones del colegio", mensaje: "Para conocer las fechas de reuniones, actos cívicos y otras actividades institucionales, revisa los avisos comunicados por el colegio.", fecha: "Consultar comunicados" },
];

export const announcementsRepository = {
  getAll(): Announcement[] { return storageService.get<Announcement[]>(KEY) ?? defaults; },
  save(items: Announcement[]): void { storageService.set(KEY, items); },
  add(item: Omit<Announcement, "id">): void {
    this.save([{ ...item, id: `announcement-${Date.now()}` }, ...this.getAll()]);
  },
  remove(id: string): void { this.save(this.getAll().filter((item) => item.id !== id)); },
};
