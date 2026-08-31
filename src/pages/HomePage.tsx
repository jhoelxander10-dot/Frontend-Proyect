import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="brand">
          <div className="brand-logo">MC</div>
          <div>
            <h1>MiColegio</h1>
            <span>Plataforma educativa</span>
          </div>
        </div>

        <nav className="home-nav">
          <a href="#inicio">Inicio</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#servicios">Servicios</a>
          <button onClick={() => navigate("/login")}>Iniciar sesión</button>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero-section">
          <div className="hero-content">
            <span className="hero-tag">BIENVENIDO A MICOLEGIO</span>
            <h2>Todo tu colegio en un solo lugar.</h2>
            <p>
              Una plataforma moderna para estudiantes, docentes y familias.
              Consulta información académica y gestiona tu experiencia escolar
              de manera sencilla.
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => navigate("/login")}>
                Entrar a la plataforma
              </button>
              <a className="secondary-button" href="#servicios">Conocer más</a>
            </div>
          </div>

          <div className="hero-card">
            <div className="card-top">
              <span>MiColegio</span>
              <span className="status">● Activo</span>
            </div>
            <div className="school-icon">🎓</div>
            <h3>Tu espacio educativo</h3>
            <p>Organiza tus actividades y mantente conectado con tu comunidad escolar.</p>
          </div>
        </section>

        <section id="nosotros" className="info-section">
          <div>
            <span className="section-tag">NUESTRA PLATAFORMA</span>
            <h2>Una web pensada para tu colegio</h2>
          </div>
          <p>
            MiColegio reúne en una misma plataforma las herramientas que necesitas
            para acceder a tu información escolar de forma rápida, clara y segura.
          </p>
        </section>

        <section id="servicios" className="services-section">
          <article className="service-card">
            <div className="service-icon">📚</div>
            <h3>Información académica</h3>
            <p>Consulta tus datos y actividades escolares desde un solo lugar.</p>
          </article>
          <article className="service-card">
            <div className="service-icon">👨‍🏫</div>
            <h3>Comunidad educativa</h3>
            <p>Facilita la comunicación entre estudiantes, docentes y familias.</p>
          </article>
          <article className="service-card">
            <div className="service-icon">🔐</div>
            <h3>Acceso seguro</h3>
            <p>Ingresa con tu cuenta para acceder a las funciones de la plataforma.</p>
          </article>
        </section>
      </main>

      <footer className="home-footer">
        <strong>MiColegio</strong>
        <span>Plataforma educativa</span>
      </footer>
    </div>
  );
}

export default HomePage;
