import { NavLink, useNavigate } from "react-router-dom";

import { authRepository } from "../../repositories/authRepository";
import type { User } from "../../types/auth";
import "./Navbar.css";

interface NavbarProps {
  user: User;
}

function Navbar({ user }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    authRepository.logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar">
      <div className="navbar__content">
        <NavLink className="navbar__brand" to="/" aria-label="Ir al inicio">
          <span className="navbar__brand-icon" aria-hidden="true">🏥</span>
          <span>Sistema de gestión</span>
        </NavLink>

        <nav className="navbar__links" aria-label="Navegación principal">
          <NavLink
            className={({ isActive }) => `navbar__link${isActive ? " navbar__link--active" : ""}`}
            to="/"
            end
          >
            Inicio
          </NavLink>
        </nav>

        <div className="navbar__profile">
          <div className="navbar__avatar" aria-hidden="true">{user.name.charAt(0).toUpperCase()}</div>
          <div className="navbar__user-details">
            <span className="navbar__user-name">{user.name}</span>
            <span className="navbar__user-role">{user.role}</span>
          </div>
          <button className="navbar__logout" type="button" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
