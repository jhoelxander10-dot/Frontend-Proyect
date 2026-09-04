import { useState } from "react";
import type { FormEventHandler } from "react";
import type { LoginCredentials, RegisterCredentials } from "../../types/auth";
import "./LoginForm.css";

interface LoginFormProps {
  error?: string;
  onSubmit: (credentials: LoginCredentials) => void;
  onRegister: (credentials: RegisterCredentials) => { ok: boolean; message: string };
}

function LoginForm({ error, onSubmit, onRegister }: LoginFormProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [carnet, setCarnet] = useState("");
  const [password, setPassword] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [registerError, setRegisterError] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setRegisterMessage("");
    setRegisterError("");

    const normalizedCarnet = carnet.trim();
    if (!normalizedCarnet || !password) return;

    if (isRegistering) {
      const result = onRegister({ name: name.trim(), carnet: normalizedCarnet, password });
      if (result.ok) {
        setRegisterMessage(result.message + " Ahora puedes iniciar sesión.");
        setIsRegistering(false);
        setName("");
        setCarnet("");
        setPassword("");
      } else {
        setRegisterError(result.message);
      }
      return;
    }

    onSubmit({ carnet: normalizedCarnet, password });
  };

  const toggleMode = () => {
    setIsRegistering((value) => !value);
    setRegisterMessage("");
    setRegisterError("");
  };

  return (
    <div className="login-page">
      <div className="login-photo-panel" aria-hidden="true">
        <div className="login-photo-overlay" />
      </div>

      <header className="portal-header">
        <span>PORTAL EDUCATIVO</span>
        <span>Mi Colegio</span>
      </header>

      <main className="login-layout">
        <section className="login-brand-panel">
          <div className="brand-content">
            <span className="brand-kicker">COMUNIDAD EDUCATIVA</span>
            <h1>Bienvenido</h1>
            <h2>al Portal Estudiantil</h2>
            <p className="brand-message">
              Tu esfuerzo de hoy construye tu futuro.
            </p>
            <div className="brand-line" />

            <div className="brand-features">
              <div className="brand-feature">
                <span className="feature-icon">▣</span>
                <div>
                  <strong>Aprende</strong>
                  <span>cada día</span>
                </div>
              </div>
              <div className="brand-feature">
                <span className="feature-icon">●</span>
                <div>
                  <strong>Crece</strong>
                  <span>con valores</span>
                </div>
              </div>
              <div className="brand-feature">
                <span className="feature-icon">◆</span>
                <div>
                  <strong>Alcanza</strong>
                  <span>tus metas</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-card-header">
            <span className="institution-name">SISTEMA EDUCATIVO</span>
            <h2>{isRegistering ? "Crear cuenta" : "Iniciar sesión"}</h2>
            <p>
              {isRegistering
                ? "Registra tus datos para acceder al portal académico."
                : "Accede a tu cuenta estudiantil"}
            </p>
          </div>

          {isRegistering && (
            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
              <div className="input-wrapper">
                <span className="input-icon" aria-hidden="true">👤</span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Nombre y apellidos"
                  autoComplete="name"
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="carnet">Carnet o usuario</label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">👤</span>
              <input
                id="carnet"
                name="carnet"
                type="text"
                value={carnet}
                onChange={(event) => setCarnet(event.target.value)}
                placeholder="Ingresa tu carnet"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">🔒</span>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Ingresa tu contraseña"
                autoComplete={isRegistering ? "new-password" : "current-password"}
                minLength={6}
                required
              />
            </div>
          </div>

          {(error || registerError) && (
            <div className="login-error" role="alert">⚠️ {error || registerError}</div>
          )}

          {registerMessage && (
            <div className="login-success" role="status">✓ {registerMessage}</div>
          )}

          <button className="login-button" type="submit">
            <span>{isRegistering ? "Crear cuenta" : "Ingresar"}</span>
            <span className="button-arrow">→</span>
          </button>

          <button className="mode-button" type="button" onClick={toggleMode}>
            {isRegistering
              ? "¿Ya tienes cuenta? Iniciar sesión"
              : "¿Eres estudiante nuevo? Crear cuenta"}
          </button>

          <div className="login-divider"><span>Portal Académico</span></div>
          <p className="login-footer">Estudia · Aprende · Supera tus límites</p>
        </form>
      </main>

      <footer className="portal-footer">Educación · Disciplina · Valores</footer>
    </div>
  );
}

export default LoginForm;
