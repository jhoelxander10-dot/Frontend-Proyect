import { storageService } from "../services/storageService";

export type Trimester = "Primer trimestre" | "Segundo trimestre" | "Tercer trimestre";

export interface StudentNote {
  materia: string;
  calificacion: number;
}

export type StudentNotesByTrimester = Record<Trimester, StudentNote[]>;

const NOTES_KEY = "student_notes_by_trimester";

export const trimestres: Trimester[] = [
  "Primer trimestre",
  "Segundo trimestre",
  "Tercer trimestre",
];

const defaultSubjects = [
  "Matemática",
  "Física",
  "Laboratorio de Química",
  "Química",
  "Literatura",
  "Gramática",
  "Sociales",
  "Biología",
  "Artes Plásticas",
  "Inglés",
  "Cálculo",
  "Filosofía",
  "Laboratorio de Física",
  "Religión",
  "Música",
  "Educación Física",
];

const createDefaultNotes = (base: number, step: number): StudentNote[] =>
  defaultSubjects.map((materia, index) => ({
    materia,
    calificacion: base + ((index * step) % 26),
  }));

const defaultNotesByTrimester: StudentNotesByTrimester = {
  "Primer trimestre": createDefaultNotes(70, 4),
  "Segundo trimestre": createDefaultNotes(72, 5),
  "Tercer trimestre": createDefaultNotes(75, 3),
};

export const notasRepository = {
  getForStudent(carnet: string, trimestre: Trimester = "Primer trimestre"): StudentNote[] {
    const allNotes = storageService.get<Record<string, StudentNotesByTrimester>>(NOTES_KEY) ?? {};

    if (!allNotes[carnet]) {
      allNotes[carnet] = defaultNotesByTrimester;
      storageService.set(NOTES_KEY, allNotes);
    }

    return allNotes[carnet][trimestre] ?? [];
  },
};
