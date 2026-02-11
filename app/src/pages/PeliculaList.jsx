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
    loadPeliculas(); 
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
        <Grid container spacing={3} justifyContent="center">
          {peliculas.map((pelicula) => (
            <Grid item key={pelicula.id} xs={12} sm={6} md={4}>
           
              <Box display="flex" justifyContent="center">
                <PeliculaCard pelicula={pelicula} onDelete={handleDelete} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
