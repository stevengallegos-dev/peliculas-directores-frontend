import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPeliculaById } from "../services/peliculasService";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import Spinner from "../components/Spinner";

export default function PeliculaDetalle() {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const [loading, setLoading] = useState(false);
  const mediaUrl = import.meta.env.VITE_MEDIA_URL;

  useEffect(() => {
    setLoading(true);
    fetchPeliculaById(id)
      .then(setPelicula)
      .catch(() => alert("Error cargando la película"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (!pelicula) return null;

  const image = pelicula.poster
    ? `${mediaUrl}/${pelicula.poster}`
    : "https://via.placeholder.com/300";

  return (
    <Card sx={{ maxWidth: 700, mx: "auto", mt: 3 }}>
      <CardMedia
        component="img"
        image={image}
        sx={{ height: 220, objectFit: "contain" }}
      />

      <CardContent>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {pelicula.titulo ?? "Sin título"}
        </Typography>

        <Box component="ul" sx={{ m: 0, pl: 2 }}>
          <li><Typography>Título: {pelicula.titulo ?? "-"}</Typography></li>
          <li><Typography>Género: {pelicula.genero ?? "-"}</Typography></li>
          <li><Typography>Duración: {pelicula.duracion ?? "-"}</Typography></li>
          <li><Typography>Fecha de estreno: {pelicula.fecha_estreno ?? "-"}</Typography></li>
        </Box>
      </CardContent>
    </Card>
  );
}
