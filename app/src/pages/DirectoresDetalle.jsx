import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDirectorById } from "../services/directoresService";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import Spinner from "../components/Spinner";

export default function DirectorDetalle() {
  const { id } = useParams();
  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(false);
  const mediaUrl = import.meta.env.VITE_MEDIA_URL;

  useEffect(() => {
    setLoading(true);
    fetchDirectorById(id)
      .then(setDirector)
      .catch(() => alert("Error cargando el director"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (!director) return null;

  const image = director.foto
    ? director.foto.startsWith("data:image")
      ? director.foto
      : `${mediaUrl}/${director.foto.replace(/^\/+/, "").replace(/^media\/?/, "")}`
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
          {director.nombre} {director.apellido}
        </Typography>

        <Box component="ul" sx={{ m: 0, pl: 2 }}>
          <li><Typography>Nombre: {director.nombre}</Typography></li>
          <li><Typography>Apellido: {director.apellido}</Typography></li>
          <li><Typography>Nivel: {director.nivel}</Typography></li>
          <li><Typography>Fecha nacimiento: {director.fecha_nacimiento}</Typography></li>
        </Box>
      </CardContent>
    </Card>
  );
}
