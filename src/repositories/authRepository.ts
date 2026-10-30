import { storageService } from "../services/storageService";
import { apiClient, type ApiUser } from "../services/apiClient";
import type { LoginCredentials, RegisterCredentials, User } from "../types/auth";

const SESSION_KEY = "app_session";

function normalizeCarnet(carnet: string): string {
  return carnet.trim().replace(/[\\s-]/g, "");
}

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
  async login(credentials: LoginCredentials): Promise<User> {
    const carnet = normalizeCarnet(credentials.carnet);
    const password = credentials.password;

    if (!carnet || !password) {
      throw new Error("Ingresa tu carnet y contraseña.");
    }

    // La autenticación se realiza en el backend; MongoDB verifica la cuenta
    // y bcrypt compara la contraseña con el hash almacenado.
    const response = await apiClient.login(carnet, password);
    apiClient.setToken(response.token);

    const sessionUser = toSessionUser(response.user);
    storageService.set<User>(SESSION_KEY, sessionUser);
    return sessionUser;
  },

  async register(credentials: RegisterCredentials): Promise<{ ok: boolean; message: string }> {
    const name = credentials.name.trim();
    const carnet = normalizeCarnet(credentials.carnet);

    if (!name || !carnet || !credentials.password) {
      return { ok: false, message: "Completa todos los campos." };
    }

    if (credentials.password.length < 6) {
      return { ok: false, message: "La contraseña debe tener al menos 6 caracteres." };
    }

    try {
      // El servidor guarda la cuenta en MongoDB y genera el hash de la contraseña.
      await apiClient.register(name, carnet, credentials.password);
      return { ok: true, message: "Cuenta creada correctamente en la base de datos." };
    } catch (error) {
      return {
        ok: false,
        message: error instanceof Error ? error.message : "No se pudo crear la cuenta.",
      };
    }
  },

  logout(): void {
    apiClient.clearToken();
    storageService.remove(SESSION_KEY);
  },

  getCurrentUser(): User | null {
    // Sin token del servidor no existe una sesión válida.
    if (!apiClient.getToken()) {
      storageService.remove(SESSION_KEY);
      return null;
    }

    return storageService.get<User>(SESSION_KEY);
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },
};
