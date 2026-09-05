import entrevistasData from "../data/entrevistas.json";

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

const entrevistas = entrevistasData as Record<string, Entrevista[]>;

export const entrevistasRepository = {
  getForStudent(carnet: string): Entrevista[] {
    return entrevistas[carnet] ?? [];
  },
};
