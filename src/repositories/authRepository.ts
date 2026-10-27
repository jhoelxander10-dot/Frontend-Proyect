import { storageService } from "../services/storageService";
import { apiClient, type ApiUser } from "../services/apiClient";
import type { LoginCredentials, RegisterCredentials, User } from "../types/auth";

const SESSION_KEY = "app_session";

function toSessionUser(user: ApiUser): User {
  return {
    id: user.id,
    name: user.name,
    carnet: user.carnet,
    curso: user.curso,
    role: user.role,
  };
}

export const authRepository = {
  async login(credentials: LoginCredentials): Promise<User | null> {
    try {
      const response = await apiClient.login(credentials.carnet.trim(), credentials.password);
      apiClient.setToken(response.token);
      const sessionUser = toSessionUser(response.user);
      storageService.set<User>(SESSION_KEY, sessionUser);
      return sessionUser;
    } catch {
      return null;
    }
  },

  async register(credentials: RegisterCredentials): Promise<{ ok: boolean; message: string }> {
    const name = credentials.name.trim();
    const carnet = credentials.carnet.trim();

    if (!name || !carnet || !credentials.password) {
      return { ok: false, message: "Completa todos los campos." };
    }
    if (credentials.password.length < 6) {
      return { ok: false, message: "La contraseña debe tener al menos 6 caracteres." };
    }

    try {
      await apiClient.register(name, carnet, credentials.password);
      return { ok: true, message: "Cuenta creada correctamente." };
    } catch (error) {
      return { ok: false, message: error instanceof Error ? error.message : "No se pudo crear la cuenta." };
    }
  },

  logout(): void {
    apiClient.clearToken();
    storageService.remove(SESSION_KEY);
  },

  getCurrentUser(): User | null {
    // Ignore old browser-only sessions created before the API migration.
    if (!apiClient.getToken()) return null;
    return storageService.get<User>(SESSION_KEY);
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null && apiClient.getToken() !== null;
  },
};
