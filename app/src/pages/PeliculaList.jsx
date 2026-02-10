import { useEffect, useState } from "react";
import { CircularProgress, Grid, Box } from "@mui/material";
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
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {(Array.isArray(peliculas) ? peliculas : []).map((pelicula) => (
        <Grid item key={pelicula.id} xs={12} sm={6} md={4}>
          <PeliculaCard pelicula={pelicula} onDelete={handleDelete} />
        </Grid>
      ))}
    </Grid>
  );
}
