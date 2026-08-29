import Navbar from "../components/navigation/Navbar";
import { authRepository } from "../repositories/authRepository";

function HomePage() {
  const user = authRepository.getCurrentUser();

  if (!user) {
    return <main className="home-page"><p>No existe una sesión activa.</p></main>;
  }

  return (
    <>
      <Navbar user={user} />
      <main className="home-page">
        <section className="home-page__welcome">
          <p className="home-page__eyebrow">Panel principal</p>
          <h1>Bienvenido, {user.name}</h1>
          <p>Gestiona la información del sistema desde un solo lugar.</p>
        </section>
        <section className="home-page__card" aria-label="Datos de sesión">
          <span>Carnet</span><strong>{user.carnet}</strong>
          <span>Rol</span><strong>{user.role}</strong>
        </section>
      </main>
    </>
  );
}

export default HomePage;
