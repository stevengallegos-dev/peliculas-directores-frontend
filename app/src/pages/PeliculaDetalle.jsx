import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPeliculaById } from "../services/peliculasService";
import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
import Spinner from "../components/Spinner";

export default function PeliculaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pelicula, setPelicula] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPeliculaById(id)
      .then(setPelicula)
      .catch(() => alert("Error cargando la película"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (!pelicula) return null;

  // poster es Base64 en TextField
  const image = pelicula.poster
    ? (pelicula.poster.startsWith("data:image")
        ? pelicula.poster
        : `data:image/jpeg;base64,${pelicula.poster}`)
    : "https://via.placeholder.com/300";

  return (
    <Card sx={{ maxWidth: 700, mx: "auto", mt: 3 }}>
      <Button onClick={() => navigate(-1)} sx={{ m: 2 }}>
        Volver
      </Button>

      <CardMedia
        component="img"
        image={image}
        sx={{ height: 260, objectFit: "contain" }}
        alt={pelicula.titulo ?? "Película"}
      />

      <CardContent>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {pelicula.titulo ?? "Sin título"}
        </Typography>

        <Box component="ul" sx={{ m: 0, pl: 2 }}>
          <li><Typography><b>Género:</b> {pelicula.genero || "—"}</Typography></li>
          <li><Typography><b>Duración (min):</b> {pelicula.duracion_min ?? "—"}</Typography></li>
          <li><Typography><b>Fecha de estreno:</b> {pelicula.fecha_estreno || "—"}</Typography></li>
          <li><Typography><b>Director:</b> {pelicula.director?.nombre || "—"}</Typography></li>
        </Box>
      </CardContent>
    </Card>
  );
}
