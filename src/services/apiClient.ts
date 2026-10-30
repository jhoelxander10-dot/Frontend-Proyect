import entrevistasData from "../data/entrevistas.json";

const TOKEN_KEY = "mi-colegio-access-token";

export interface ApiUser {
  id: string;
  name: string;
  carnet: string;
  curso: string;
  role: "ADMIN" | "USUARIO";
}

export interface ApiTask {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  details: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthResponse {
  token: string;
  user: ApiUser;
}

// Simulamos una base de datos local en memoria basada en el JSON
let usuariosLocal = [...((entrevistasData as any).usuarios || [])];

export const apiClient = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  async login(carnet: string, password: string): Promise<AuthResponse> {
    // Simulamos un retraso de red breve
    await new Promise((resolve) => setTimeout(resolve, 300));

    const usuario = usuariosLocal.find(
      (u: any) => u.carnet === carnet && (u.contrasena === password || u.password === password)
    );

    if (!usuario) {
      throw new Error("Carnet o contraseña incorrectos.");
    }

    const fakeToken = "local-mock-token-" + usuario.carnet;
    this.setToken(fakeToken);

    const apiUser: ApiUser = {
      id: usuario.carnet,
      name: usuario.nombre || usuario.name || "Estudiante",
      carnet: usuario.carnet,
      curso: "General",
      role: "USUARIO",
    };

    return { token: fakeToken, user: apiUser };
  },

  async register(name: string, carnet: string, password: string): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const existe = usuariosLocal.find((u: any) => u.carnet === carnet);
    if (existe) {
      throw new Error("El carnet ya está registrado.");
    }

    const nuevoUsuario = { carnet, contrasena: password, nombre: name };
    usuariosLocal.push(nuevoUsuario);

    const fakeToken = "local-mock-token-" + carnet;
    this.setToken(fakeToken);

    const apiUser: ApiUser = {
      id: carnet,
      name,
      carnet,
      curso: "General",
      role: "USUARIO",
    };

    return { token: fakeToken, user: apiUser };
  },

  async getTasks(): Promise<{ tasks: ApiTask[] }> {
    return { tasks: [] };
  },

  async createTask(task: Omit<ApiTask, "id" | "completed" | "createdAt" | "updatedAt">): Promise<{ task: ApiTask }> {
    const newTask: ApiTask = {
      ...task,
      id: Math.random().toString(36).substring(7),
      completed: false,
    };
    return { task: newTask };
  },

  async updateTask(id: string, changes: any): Promise<{ task: ApiTask }> {
    return { task: { id, title: "", subject: "", dueDate: "", details: "", completed: false, ...changes } };
  },

  async deleteTask(_id: string): Promise<void> {
    return;
  },
};