import { storageService } from "../services/storageService";

export interface StudentNote {
  materia: string;
  calificacion: number;
}

const NOTES_KEY = "student_notes";

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

const defaultNotes = defaultSubjects.map((materia, index) => ({
  materia,
  calificacion: 70 + ((index * 4) % 26),
}));

export const notasRepository = {
  getForStudent(carnet: string): StudentNote[] {
    const allNotes = storageService.get<Record<string, StudentNote[]>>(NOTES_KEY) ?? {};

    if (!allNotes[carnet]) {
      allNotes[carnet] = defaultNotes;
      storageService.set(NOTES_KEY, allNotes);
    }

    return allNotes[carnet];
  },
};
