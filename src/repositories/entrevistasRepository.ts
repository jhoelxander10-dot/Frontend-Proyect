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

const datos = entrevistasData as unknown as {
  entrevistas: Record<string, Entrevista[]>;
};

const entrevistas = datos.entrevistas;

export const entrevistasRepository = {
  getForStudent(carnet: string): Entrevista[] {
    return entrevistas[carnet] ?? [];
  },
};
