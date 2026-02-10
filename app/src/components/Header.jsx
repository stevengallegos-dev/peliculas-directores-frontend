import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import { logout } from "../services/authService";

export default function Header() {
  const isLoggedIn = localStorage.getItem("access_token") !== null;
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    alert("Sesión cerrada exitosamente");
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      sx={{ background: "linear-gradient(180deg,#0f172a,#1e40af)" }}
    >
      <Toolbar
        sx={{
          minHeight: 280,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="logo"
          sx={{ height: 260, width: "auto" }}
        />

        <Typography
          variant="h4"
          sx={{ fontWeight: 800, letterSpacing: 2, color: "white" }}
        >
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Películas
          </Button>
          <Button color="inherit" component={Link} to="/directores">
            Directores
          </Button>
        </Box>

        {isLoggedIn && (
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <Button color="inherit" component={Link} to="/add-pelicula">
              Agregar Película
            </Button>
            <Button color="inherit" component={Link} to="/add-director">
              Agregar Director
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </Box>
        )}

        {!isLoggedIn && (
          <Button sx={{ mt: 1 }} color="inherit" component={Link} to="/login">
            Iniciar sesión
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
