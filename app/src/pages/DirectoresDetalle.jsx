import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDirectorById } from "../services/directoresService";
import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
import Spinner from "../components/Spinner";

export default function DirectorDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchDirectorById(id)
      .then(setDirector)
      .catch(() => alert("Error cargando el director"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (!director) return null;

  // foto es Base64 en TextField
  const image = director.foto
    ? (director.foto.startsWith("data:image")
        ? director.foto
        : `data:image/jpeg;base64,${director.foto}`)
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
        alt={director.nombre}
      />

      <CardContent>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {director.nombre}
        </Typography>

        <Box component="ul" sx={{ m: 0, pl: 2 }}>
          <li><Typography><b>Nacionalidad:</b> {director.nacionalidad || "—"}</Typography></li>
          <li><Typography><b>Descripción:</b> {director.descripcion || "—"}</Typography></li>
        </Box>

        <Typography variant="h6" sx={{ mt: 3 }}>
          Películas
        </Typography>

        {director.peliculas?.length ? (
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            {director.peliculas.map((p) => (
              <li key={p.id}>
                <Typography>
                  {p.titulo} {p.genero ? `(${p.genero})` : ""}
                </Typography>
              </li>
            ))}
          </Box>
        ) : (
          <Typography sx={{ mt: 1 }}>Este director no tiene películas registradas.</Typography>
        )}
      </CardContent>
    </Card>
  );
}
