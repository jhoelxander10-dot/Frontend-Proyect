import entrevistasData from '../data/entrevistas.json';

// Definimos la interfaz del usuario para que TypeScript no dé error de 'any'
interface Usuario {
  carnet: string;
  contrasena: string;
  nombre?: string;
}

export const verificarCredenciales = (carnet: string, contrasena: string) => {
  // Accedemos a usuarios de forma segura comprobando que exista en la estructura del JSON
  const usuariosList: Usuario[] = (entrevistasData as any).usuarios || [];

  // Buscamos el usuario
  const usuarioEncontrado = usuariosList.find(
    (u: Usuario) => u.carnet === carnet && u.contrasena === contrasena
  );

  if (usuarioEncontrado) {
    return { success: true, user: usuarioEncontrado };
  } else {
    throw new Error('Carnet o contraseña incorrectos');
  }
};