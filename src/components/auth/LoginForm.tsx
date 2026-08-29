import { useState } from "react";
import type { FormEventHandler } from "react";
import type { LoginCredentials } from "../../types/auth";
import "./LoginForm.css";

interface LoginFormProps {
  error?: string;
  onSubmit: (credentials: LoginCredentials) => void;
}

function LoginForm({ error, onSubmit }: LoginFormProps) {
  const [carnet, setCarnet] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const normalizedCarnet = carnet.trim();

    if (!normalizedCarnet || !password) {
      return;
    }

    onSubmit({
      carnet: normalizedCarnet,
      password,
    });
  };

  return (
    <div className="login-page">
      <div className="background-circle circle-one"></div>
      <div className="background-circle circle-two"></div>

      <form className="login-card" onSubmit={handleSubmit}>
        
        <div className="login-logo">
          <span>🏥</span>
        </div>

        <div className="login-title">
          <h1>Bienvenido</h1>
          <p>Inicia sesión en tu cuenta</p>
        </div>

        <div className="form-group">
          <label htmlFor="carnet">
            Carnet de identidad
          </label>

          <div className="input-wrapper">
            <span className="input-icon">👤</span>

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
          <label htmlFor="password">
            Contraseña
          </label>

          <div className="input-wrapper">
            <span className="input-icon">🔒</span>

            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Ingresa tu contraseña"
              autoComplete="current-password"
              required
            />
          </div>
        </div>

        {error && (
          <div className="login-error" role="alert">
            ⚠️ {error}
          </div>
        )}

        <button className="login-button" type="submit">
          <span>Iniciar sesión</span>
          <span className="button-arrow">→</span>
        </button>

        <div className="login-divider">
          <span>Sistema de gestión</span>
        </div>

        <p className="login-footer">
          Acceso seguro y protegido
        </p>

      </form>
    </div>
  );
}

export default LoginForm;