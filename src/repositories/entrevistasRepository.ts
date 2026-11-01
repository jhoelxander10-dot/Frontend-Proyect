import entrevistasData from "../data/entrevistas.json";
import { storageService } from "../services/storageService";

export interface Entrevista {
  id: string;
  materia: string;
  motivo: string;
  fecha: string;
  hora: string;
  lugar: string;
  estado: string;
  observacion: string;
}
export type InterviewRecord = Entrevista & { carnet: string };
const KEY = "school_interviews";
const datos = entrevistasData as unknown as { entrevistas: Record<string, Entrevista[]> };
const defaults: InterviewRecord[] = Object.entries(datos.entrevistas).flatMap(([carnet, items]) =>
  items.map((item) => ({ ...item, carnet }))
);
function getRecords(): InterviewRecord[] { return storageService.get<InterviewRecord[]>(KEY) ?? defaults; }
export const entrevistasRepository = {
  getAll(): InterviewRecord[] { return getRecords(); },
  getForStudent(carnet: string): Entrevista[] { return getRecords().filter((item) => item.carnet === carnet).map(({ carnet: _carnet, ...item }) => item); },
  addForStudent(carnet: string, data: Omit<Entrevista, "id">): void {
    storageService.set(KEY, [...getRecords(), { ...data, carnet, id: `interview-${Date.now()}` }]);
  },
  remove(carnet: string, id: string): void {
    storageService.set(KEY, getRecords().filter((item) => !(item.carnet === carnet && item.id === id)));
  },
};
