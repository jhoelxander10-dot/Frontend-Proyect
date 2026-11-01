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
  setForStudent(carnet: string, trimestre: Trimester, materia: string, calificacion: number): void {
    const allNotes = storageService.get<Record<string, StudentNotesByTrimester>>(NOTES_KEY) ?? {};
    const studentNotes = allNotes[carnet] ?? { ...defaultNotesByTrimester };
    const current = studentNotes[trimestre] ?? [];
    const exists = current.some((item) => item.materia === materia);
    studentNotes[trimestre] = exists
      ? current.map((item) => item.materia === materia ? { ...item, calificacion } : item)
      : [...current, { materia, calificacion }];
    allNotes[carnet] = studentNotes;
    storageService.set(NOTES_KEY, allNotes);
  },
  getForStudent(carnet: string, trimestre: Trimester = "Primer trimestre"): StudentNote[] {
    const allNotes = storageService.get<Record<string, StudentNotesByTrimester>>(NOTES_KEY) ?? {};

    if (!allNotes[carnet]) {
      allNotes[carnet] = defaultNotesByTrimester;
      storageService.set(NOTES_KEY, allNotes);
    }

    return allNotes[carnet][trimestre] ?? [];
  },
};
