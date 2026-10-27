# MiColegio API

Backend REST para autenticación y calendario de tareas por estudiante.

## Requisitos
- Node.js 20 o superior
- MongoDB Atlas (o una instancia MongoDB administrada)
- Una clave JWT aleatoria de al menos 32 caracteres

## Preparación local
1. Entra en la carpeta `server`: `cd server`.
2. Instala dependencias: `npm install`.
3. Copia `.env.example` a `.env` y configura `MONGODB_URI`, `JWT_SECRET` y `CLIENT_ORIGIN`.
4. En MongoDB Atlas, crea una base de datos, un usuario de base de datos y permite el acceso de red necesario. No publiques la URI ni la contraseña.
5. Ejecuta `npm run dev`.
6. Comprueba `http://localhost:3000/api/health`.

## Rutas
- `POST /api/auth/register` — crea cuentas de estudiante; el rol nunca se acepta del cliente.
- `POST /api/auth/login` — verifica carnet y contraseña.
- `GET /api/auth/me` — devuelve la cuenta de la sesión.
- `GET /api/tasks` — lista únicamente las tareas del usuario autenticado.
- `POST /api/tasks` — crea una tarea para el usuario autenticado.
- `PATCH /api/tasks/:id` — modifica una tarea propia, incluida la marca `completed`.
- `DELETE /api/tasks/:id` — elimina una tarea propia.

Las rutas de tareas requieren `Authorization: Bearer <token>`. El servidor determina el propietario desde el token; nunca acepta un ID de estudiante enviado por el navegador para decidir qué tareas devolver.

## Producción
Configura las variables de entorno en el proveedor de despliegue, usa HTTPS y restringe `CLIENT_ORIGIN` al dominio real del frontend. Genera un JWT secret aleatorio y rota cualquier secreto que haya sido publicado accidentalmente. No subas `.env` a Git.
