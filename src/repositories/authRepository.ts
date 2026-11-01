import initialUsers from "../data/users.json";
import { storageService } from "../services/storageService";
import type {
  LoginCredentials,
  RegisterCredentials,
  User,
  UserRecord,
} from "../types/auth";

const SESSION_KEY = "app_session";
const USERS_KEY = "institutional_users";
const ADMIN_USERS_KEY = "institutional_users_admin";
const baseUsers = initialUsers as UserRecord[];

function normalizeCarnet(carnet: string): string {
  return carnet.trim().toLowerCase();
}

function getUsers(): UserRecord[] {
  const managedUsers = storageService.get<UserRecord[]>(ADMIN_USERS_KEY);
  if (managedUsers) return managedUsers;
  const savedUsers = storageService.get<UserRecord[]>(USERS_KEY) ?? [];
  return [...baseUsers, ...savedUsers];
}

export const authRepository = {
  getAllUsers(): UserRecord[] { return getUsers(); },

  createUser(user: Omit<UserRecord, "id">): { ok: boolean; message: string } {
    const name = user.name.trim();
    const carnet = user.carnet.trim();
    if (!name || !carnet || !user.password || user.password.length < 6) return { ok: false, message: "Completa los campos y usa una contraseña de al menos 6 caracteres." };
    const users = getUsers();
    if (users.some((item) => normalizeCarnet(item.carnet) === normalizeCarnet(carnet))) return { ok: false, message: "Ese carnet ya está registrado." };
    storageService.set<UserRecord[]>(ADMIN_USERS_KEY, [...users, { ...user, id: `user-${Date.now()}`, name, carnet }]);
    return { ok: true, message: "Usuario creado." };
  },

  updateUserRole(id: string, role: User["role"]): void {
    storageService.set<UserRecord[]>(ADMIN_USERS_KEY, getUsers().map((user) => user.id === id ? { ...user, role } : user));
  },

  deleteUser(id: string): void {
    storageService.set<UserRecord[]>(ADMIN_USERS_KEY, getUsers().filter((user) => user.id !== id));
  },
  login(credentials: LoginCredentials): User | null {
    const carnet = normalizeCarnet(credentials.carnet);
    const foundUser = getUsers().find(
      (user) =>
        normalizeCarnet(user.carnet) === carnet &&
        user.password === credentials.password
    );

    if (!foundUser) {
      storageService.remove(SESSION_KEY);
      return null;
    }

    const sessionUser: User = {
      id: foundUser.id,
      name: foundUser.name,
      carnet: foundUser.carnet,
      curso: foundUser.curso || "6A Secundaria",
      role: foundUser.role,
    };

    storageService.set<User>(SESSION_KEY, sessionUser);
    return sessionUser;
  },

  register(credentials: RegisterCredentials): { ok: boolean; message: string } {
    const name = credentials.name.trim();
    const carnet = credentials.carnet.trim();
    const password = credentials.password;

    if (!name || !carnet || !password) {
      return { ok: false, message: "Completa todos los campos." };
    }

    if (password.length < 6) {
      return { ok: false, message: "La contraseña debe tener al menos 6 caracteres." };
    }

    if (getUsers().some((user) => normalizeCarnet(user.carnet) === normalizeCarnet(carnet))) {
      return { ok: false, message: "Ese carnet ya tiene una cuenta institucional." };
    }

    const newUser: UserRecord = {
      id: `student-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      carnet,
      curso: "6A Secundaria",
      password,
      role: "USUARIO",
    };

    const savedUsers = storageService.get<UserRecord[]>(USERS_KEY) ?? [];
    storageService.set<UserRecord[]>(USERS_KEY, [...savedUsers, newUser]);

    const persistedUsers = storageService.get<UserRecord[]>(USERS_KEY) ?? [];
    if (!persistedUsers.some((user) => user.id === newUser.id)) {
      return {
        ok: false,
        message: "No se pudo guardar la cuenta en este navegador. Revisa el almacenamiento disponible.",
      };
    }

    return { ok: true, message: "Cuenta creada correctamente." };
  },

  logout(): void {
    storageService.remove(SESSION_KEY);
  },

  getCurrentUser(): User | null {
    return storageService.get<User>(SESSION_KEY);
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },
};
