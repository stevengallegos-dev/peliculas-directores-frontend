import { AppBar, Button, Toolbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";   // 👈 ESTE es tu logo
import { logout } from "../services/authService";
import "./Header.css";

export default function Header() {
  const isLoggedIn = localStorage.getItem("access_token") !== null;
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    alert("Sesión cerrada exitosamente");
    navigate("/");
  };

  return (
    <header className="pokedex-navbar">
      <AppBar position="static">
        <Toolbar>
          <img
            src={logo}
            alt="Películas y Directores"
            height={60}
            style={{ marginRight: 20 }}
          />

          <Button color="inherit" component={Link} to="/">
            Películas
          </Button>

          <Button color="inherit" component={Link} to="/directores">
            Directores
          </Button>

          {isLoggedIn && (
            <>
              <Button color="inherit" component={Link} to="/add-pelicula">
                Agregar Película
              </Button>

              <Button color="inherit" component={Link} to="/add-director">
                Agregar Director
              </Button>

              <Button color="inherit" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </>
          )}

          {!isLoggedIn && (
            <Button color="inherit" component={Link} to="/login">
              Iniciar sesión
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
}
