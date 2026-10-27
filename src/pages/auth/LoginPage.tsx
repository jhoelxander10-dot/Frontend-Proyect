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
    const user = await authRepository.login(credentials);

    if (!user) {
      setError("No se pudo iniciar sesión. Verifica tus datos y que el servidor esté disponible.");
      return;
    }

    navigate("/", { replace: true });
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
