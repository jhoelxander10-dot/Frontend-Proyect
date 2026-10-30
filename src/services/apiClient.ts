const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const API_BASE_URL = (
  configuredApiUrl || (import.meta.env.DEV ? "http://localhost:3000" : "")
).replace(/\/$/, "");
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

  async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    if (!API_BASE_URL) {
      throw new Error(
        "El servidor del portal no está configurado. Configura VITE_API_URL con la dirección pública de la API en el despliegue."
      );
    }

    const token = this.getToken();
    let response: Response;

    try {
      response = await fetch(`${API_BASE_URL}${path}`, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...init.headers,
        },
      });
    } catch {
      throw new Error(
        `No se pudo conectar con el servidor (${API_BASE_URL}). Comprueba que la API esté encendida y que VITE_API_URL sea correcta.`
      );
    }

    if (!response.ok) {
      const payload = await response.json().catch(() => null) as { message?: string } | null;
      throw new Error(payload?.message || `Error del servidor (${response.status}).`);
    }

    if (response.status === 204) return undefined as T;
    return response.json() as Promise<T>;
  },

  login(carnet: string, password: string) {
    return this.request<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ carnet, password }),
    });
  },

  register(name: string, carnet: string, password: string) {
    return this.request<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, carnet, password }),
    });
  },

  getTasks() {
    return this.request<{ tasks: ApiTask[] }>("/api/tasks");
  },

  createTask(task: Omit<ApiTask, "id" | "completed" | "createdAt" | "updatedAt">) {
    return this.request<{ task: ApiTask }>("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });
  },

  updateTask(id: string, changes: Partial<Pick<ApiTask, "title" | "subject" | "dueDate" | "details" | "completed">>) {
    return this.request<{ task: ApiTask }>(`/api/tasks/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(changes),
    });
  },

  deleteTask(id: string) {
    return this.request<void>(`/api/tasks/${encodeURIComponent(id)}`, { method: "DELETE" });
  },
};
