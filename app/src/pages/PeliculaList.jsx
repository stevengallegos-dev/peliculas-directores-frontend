import { useEffect, useState } from "react";
import { CircularProgress, Grid, Box, Container, Typography } from "@mui/material";
import PeliculaCard from "../components/PeliculaCard";
import { fetchPeliculas, deletePelicula } from "../services/peliculasService";

export default function PeliculaList() {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPeliculas = () => {
    setLoading(true);
    fetchPeliculas()
      .then((data) => setPeliculas(data?.results ?? data ?? []))
      .catch(() => alert("Error obteniendo las películas"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPeliculas(); // ✅ público, sin login
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar esta película?")) return;
    await deletePelicula(id);
    loadPeliculas();
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(180deg, #eef2ff, #e0e7ff)",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #eef2ff, #e0e7ff)",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, color: "#0f172a", mb: 4, textAlign: "center" }}
        >
          Películas
        </Typography>

        <Grid container spacing={3}>
          {peliculas.map((pelicula) => (
            <Grid item key={pelicula.id} xs={12} sm={6} md={4} lg={4} xl={4}>
              <PeliculaCard pelicula={pelicula} onDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
