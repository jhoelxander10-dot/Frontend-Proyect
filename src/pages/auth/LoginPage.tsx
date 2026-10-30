import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import { authRepository } from "../../repositories/authRepository";
import type { LoginCredentials, RegisterCredentials } from "../../types/auth";

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const currentUser = authRepository.getCurrentUser();

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (credentials: LoginCredentials) => {
    setError("");
    try {
      await authRepository.login(credentials);
      navigate("/", { replace: true });
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "No se pudo iniciar sesión. Comprueba tus datos y la conexión con el servidor."
      );
    }
  };

  const handleRegister = async (credentials: RegisterCredentials) => {
    setError("");
    return authRepository.register(credentials);
  };

  return (
    <main>
      <LoginForm error={error} onSubmit={handleLogin} onRegister={handleRegister} />
    </main>
  );
}

export default LoginPage;
