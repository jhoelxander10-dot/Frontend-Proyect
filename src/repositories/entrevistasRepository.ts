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

interface EntrevistasData {
  entrevistas?: Record<string, Entrevista[]>;
}

const datos = entrevistasData as EntrevistasData;
const entrevistas = datos.entrevistas ?? {};

export const entrevistasRepository = {
  getForStudent(carnet: string): Entrevista[] {
    return entrevistas[carnet] ?? [];
  },
};
