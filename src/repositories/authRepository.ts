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

function normalizeCarnet(carnet: string): string {
  return carnet.trim().replace(/[\s-]/g, "");
}

function getSavedUsers(): UserRecord[] {
  const value = storageService.get<unknown>(USERS_KEY);
  return Array.isArray(value)
    ? value.filter(
        (user): user is UserRecord =>
          Boolean(user) &&
          typeof user === "object" &&
          typeof user.carnet === "string" &&
          typeof user.password === "string"
      )
    : [];
}

function getUsers(): UserRecord[] {
  const usersByCarnet = new Map<string, UserRecord>();

  // Las cuentas incluidas con el proyecto tienen prioridad sobre copias antiguas
  // guardadas en el navegador, que podrían tener contraseñas desactualizadas.
  for (const user of baseUsers) {
    usersByCarnet.set(normalizeCarnet(user.carnet), user);
  }

  for (const user of getSavedUsers()) {
    const carnet = normalizeCarnet(user.carnet);
    if (carnet && !usersByCarnet.has(carnet)) {
      usersByCarnet.set(carnet, user);
    }
  }

  return Array.from(usersByCarnet.values());
}

function isValidUser(value: unknown): value is User {
  if (!value || typeof value !== "object") return false;

  const user = value as Partial<User>;
  return (
    typeof user.id === "string" &&
    typeof user.name === "string" &&
    typeof user.carnet === "string" &&
    typeof user.curso === "string" &&
    (user.role === "ADMIN" || user.role === "USUARIO")
  );
}

export const authRepository = {
  login(credentials: LoginCredentials): User | null {
    const carnet = normalizeCarnet(credentials.carnet);
    const password = credentials.password;

    if (!carnet || !password) return null;

    const foundUser = getUsers().find(
      (user) =>
        normalizeCarnet(user.carnet) === carnet &&
        user.password === password
    );

    if (!foundUser) return null;

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
    const carnet = normalizeCarnet(credentials.carnet);
    const password = credentials.password;

    if (!name || !carnet || !password) {
      return { ok: false, message: "Completa todos los campos." };
    }

    if (password.length < 6) {
      return { ok: false, message: "La contraseña debe tener al menos 6 caracteres." };
    }

    if (getUsers().some((user) => normalizeCarnet(user.carnet) === carnet)) {
      return { ok: false, message: "Ese carnet ya tiene una cuenta institucional." };
    }

    const newUser: UserRecord = {
      id: `student-${Date.now()}`,
      name,
      carnet,
      curso: "6A Secundaria",
      password,
      role: "USUARIO",
    };

    const savedUsers = getSavedUsers();
    storageService.set<UserRecord[]>(USERS_KEY, [...savedUsers, newUser]);

    return { ok: true, message: "Cuenta creada correctamente." };
  },

  logout(): void {
    storageService.remove(SESSION_KEY);
  },

  getCurrentUser(): User | null {
    const currentUser: unknown = storageService.get<unknown>(SESSION_KEY);

    if (!isValidUser(currentUser)) {
      if (currentUser !== null) storageService.remove(SESSION_KEY);
      return null;
    }

    return currentUser;
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },
};
