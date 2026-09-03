import { storageService } from "../services/storageService";

export interface StudentNote {
  materia: string;
  calificacion: number;
}

const NOTES_KEY = "student_notes";

const defaultSubjects = [
  "Matemática",
  "Lenguaje",
  "Inglés",
  "Programación",
  "Ciencias Sociales",
  "Física",
  "Química",
  "Educación Física",
];

const defaultNotes = defaultSubjects.map((materia, index) => ({
  materia,
  calificacion: 75 + (index * 3) % 21,
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
