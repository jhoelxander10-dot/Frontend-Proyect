import { storageService } from "../services/storageService";
import { apiClient, type ApiUser } from "../services/apiClient";
import type { LoginCredentials, RegisterCredentials, User } from "../types/auth";

const SESSION_KEY = "app_session";
const LOCAL_USERS_KEY = "micolegio_local_users";
const LOCAL_SESSION_KEY = "micolegio_local_session";

interface LocalUserRecord extends User {
  password: string;
}

const DEMO_USER: LocalUserRecord = {
  id: "demo-student",
  name: "Estudiante de prueba",
  carnet: "12345678",
  curso: "6A Secundaria",
  role: "USUARIO",
  password: "123456",
};

function toSessionUser(user: ApiUser): User {
  return {
    id: user.id,
    name: user.name,
    carnet: user.carnet,
    curso: user.curso,
    role: user.role,
  };
}

function getLocalUsers(): LocalUserRecord[] {
  const savedUsers = storageService.get<LocalUserRecord[]>(LOCAL_USERS_KEY);
  if (savedUsers) return savedUsers;

  storageService.set<LocalUserRecord[]>(LOCAL_USERS_KEY, [DEMO_USER]);
  return [DEMO_USER];
}

function isApiUnavailable(error: unknown): boolean {
  if (!(error instanceof Error)) return false;

  return (
    error.message.startsWith("No se pudo conectar con el servidor") ||
    error.message.startsWith("El servidor del portal no está configurado") ||
    error.message === "Ocurrió un error interno."
  );
}

function loginLocally(credentials: LoginCredentials): User {
  const carnet = credentials.carnet.trim();
  const user = getLocalUsers().find(
    (item) => item.carnet.toLowerCase() === carnet.toLowerCase() &&
      item.password === credentials.password
  );

  if (!user) {
    throw new Error("Carnet o contraseña incorrectos. En modo local puedes usar 12345678 / 123456.");
  }

  // A local session is separate from the API token and never calls MongoDB.
  apiClient.clearToken();
  storageService.remove(SESSION_KEY);
  const sessionUser: User = {
    id: user.id,
    name: user.name,
    carnet: user.carnet,
    curso: user.curso,
    role: user.role,
  };
  storageService.set<User>(LOCAL_SESSION_KEY, sessionUser);
  return sessionUser;
}

export const authRepository = {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await apiClient.login(credentials.carnet.trim(), credentials.password);
      apiClient.setToken(response.token);
      storageService.remove(LOCAL_SESSION_KEY);
      const sessionUser = toSessionUser(response.user);
      storageService.set<User>(SESSION_KEY, sessionUser);
      return sessionUser;
    } catch (error) {
      if (isApiUnavailable(error)) {
        return loginLocally(credentials);
      }
      throw error;
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
      if (!isApiUnavailable(error)) {
        return {
          ok: false,
          message: error instanceof Error ? error.message : "No se pudo crear la cuenta.",
        };
      }

      const users = getLocalUsers();
      if (users.some((user) => user.carnet.toLowerCase() === carnet.toLowerCase())) {
        return { ok: false, message: "Ese carnet ya tiene una cuenta en este navegador." };
      }

      const newUser: LocalUserRecord = {
        id: `local-${Date.now()}`,
        name,
        carnet,
        curso: "6A Secundaria",
        role: "USUARIO",
        password: credentials.password,
      };
      storageService.set<LocalUserRecord[]>(LOCAL_USERS_KEY, [...users, newUser]);
      return { ok: true, message: "Cuenta local creada correctamente." };
    }
  },

  logout(): void {
    apiClient.clearToken();
    storageService.remove(SESSION_KEY);
    storageService.remove(LOCAL_SESSION_KEY);
  },

  getCurrentUser(): User | null {
    const localSession = storageService.get<User>(LOCAL_SESSION_KEY);
    if (localSession) return localSession;

    // API sessions continue working as before.
    if (!apiClient.getToken()) return null;
    return storageService.get<User>(SESSION_KEY);
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },
};
