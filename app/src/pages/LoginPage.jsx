import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import Spinner from "../components/Spinner";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const responseData = await login(loginData.username, loginData.password);
      localStorage.setItem("access_token", responseData.access_token);
      alert("Inicio de sesión exitoso");
      // 👉 Redirigir a la vista principal de DIRECTORES
      navigate("/directores");
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        Inicio de sesión
      </Typography>

      <TextField
        label="Usuario"
        name="username"
        value={loginData.username}
        onChange={handleChange}
        required
      />

      <TextField
        label="Contraseña"
        name="password"
        type="password"
        value={loginData.password}
        onChange={handleChange}
        required
      />

      <Button type="submit" variant="contained">
        Iniciar sesión
      </Button>
    </Box>
  );
}
