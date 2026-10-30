# MiColegio API

Backend REST para autenticación y calendario de tareas por estudiante.

## Requisitos
- Node.js 20 o superior
- MongoDB Atlas (o una instancia MongoDB administrada)
- Una clave JWT aleatoria de al menos 32 caracteres

## Preparación local
1. Desde la raíz del repositorio entra en el backend: `cd server`.
2. Instala dependencias: `npm install`.
3. Copia `.env.example` a `.env` dentro de `server`.
4. Configura `MONGODB_URI`, `JWT_SECRET` y `CLIENT_ORIGINS=http://localhost:5173`.
5. En MongoDB Atlas, crea una base de datos y un usuario de base de datos; permite el acceso de red desde tu entorno. No publiques la URI ni la contraseña.
6. Ejecuta `npm run dev`.
7. Comprueba `http://localhost:3000/api/health`; debe responder con estado `ok`.

En la raíz del frontend crea también un archivo `.env` con:
```env
VITE_API_URL=http://localhost:3000
```
Reinicia Vite después de cambiar variables de entorno.

## Despliegue del backend
Puedes desplegar el servicio como una aplicación Node en un proveedor como Render:
- Root Directory: `server`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Environment: configura `NODE_ENV=production`, `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN=1d` y `CLIENT_ORIGINS`.
- En `CLIENT_ORIGINS` coloca los dos orígenes separados por coma: `http://localhost:5173,https://TU-PROYECTO.vercel.app`. Sustituye el dominio de ejemplo por el dominio real de Vercel.

Cuando el backend esté desplegado, configura en Vercel la variable `VITE_API_URL` con la URL HTTPS del backend, sin una barra final, por ejemplo `https://tu-api.onrender.com`. Después vuelve a desplegar el frontend.

## Rutas
- `GET /api/health` — comprueba que la API está encendida.
- `POST /api/auth/register` — crea cuentas de estudiante; el rol nunca se acepta del cliente.
- `POST /api/auth/login` — verifica carnet y contraseña.
- `GET /api/auth/me` — devuelve la cuenta de la sesión.
- `GET /api/tasks` — lista únicamente las tareas del usuario autenticado.
- `POST /api/tasks` — crea una tarea para el usuario autenticado.
- `PATCH /api/tasks/:id` — modifica una tarea propia.
- `DELETE /api/tasks/:id` — elimina una tarea propia.

Las rutas de tareas requieren `Authorization: Bearer <token>`. El servidor determina el propietario desde el token.

## Seguridad
No subas archivos `.env` a Git. Usa HTTPS y secretos fuertes. No compartas credenciales de MongoDB ni JWT.
