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
      const result = onRegister({ name, carnet: normalizedCarnet, password });
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
      <div className="background-circle circle-one" />
      <div className="background-circle circle-two" />

      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-logo">
          <img src="https://donboscosucre.edu.bo/logo-white.png" alt="Logo Don Bosco Sucre" />
        </div>

        <div className="login-title">
          <span className="institution-name">UNIDAD EDUCATIVA DON BOSCO</span>
          <h1>{isRegistering ? "Crear cuenta" : "Bienvenido"}</h1>
          <p>
            {isRegistering
              ? "Registra tu cuenta estudiantil institucional"
              : "Ingresa al portal académico del estudiante"}
          </p>
        </div>

        {isRegistering && (
          <div className="form-group">
            <label htmlFor="name">Nombre completo</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Escribe tu nombre completo"
                autoComplete="name"
                required
              />
            </div>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="carnet">Carnet de identidad</label>
          <div className="input-wrapper">
            <span className="input-icon">🪪</span>
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
            <span className="input-icon">🔒</span>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mínimo 6 caracteres"
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
          <span>{isRegistering ? "Crear cuenta institucional" : "Iniciar sesión"}</span>
          <span className="button-arrow">→</span>
        </button>

        <button className="mode-button" type="button" onClick={toggleMode}>
          {isRegistering
            ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿Eres estudiante nuevo? Crear cuenta"}
        </button>

        <div className="login-divider"><span>Portal académico estudiantil</span></div>
        <p className="login-footer">Consulta tus notas, cursos y horarios desde tu cuenta.</p>
      </form>
    </div>
  );
}

export default LoginForm;
