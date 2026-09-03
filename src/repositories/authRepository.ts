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
const baseUsers = initialUsers as UserRecord[];

function getUsers(): UserRecord[] {
  const savedUsers = storageService.get<UserRecord[]>(USERS_KEY);
  return savedUsers ? [...baseUsers, ...savedUsers] : baseUsers;
}

export const authRepository = {
  login(credentials: LoginCredentials): User | null {
    const foundUser = getUsers().find(
      (user) => user.carnet === credentials.carnet && user.password === credentials.password
    );

    if (!foundUser) return null;

    const sessionUser: User = {
      id: foundUser.id,
      name: foundUser.name,
      carnet: foundUser.carnet,
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

    if (getUsers().some((user) => user.carnet === carnet)) {
      return { ok: false, message: "Ese carnet ya tiene una cuenta institucional." };
    }

    const newUser: UserRecord = {
      id: `student-${Date.now()}`,
      name,
      carnet,
      password,
      role: "USUARIO",
    };

    const savedUsers = storageService.get<UserRecord[]>(USERS_KEY) ?? [];
    storageService.set<UserRecord[]>(USERS_KEY, [...savedUsers, newUser]);

    return { ok: true, message: "Cuenta institucional creada correctamente." };
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
