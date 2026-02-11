import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDirectorById } from "../services/directoresService";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Spinner from "../components/Spinner";

export default function DirectoresDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const cargarDirector = async () => {
      setLoading(true);
      try {
        const data = await fetchDirectorById(id);
        if (isMounted) setDirector(data);
      } catch {
        alert("Error cargando el director");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (id) cargarDirector();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <Spinner />;

  if (!director) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h5">😕 No se encontró el director</Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </Box>
    );
  }

  return (
    <Card sx={{ maxWidth: 700, mx: "auto", mt: 3 }}>
      <Button onClick={() => navigate(-1)} sx={{ m: 2 }}>
        Volver
      </Button>

      <CardContent>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {director.nombre ?? "Sin nombre"}
        </Typography>

        <Box component="ul" sx={{ m: 0, pl: 2 }}>
          <li>
            <Typography>
              <b>Nacionalidad:</b> {director.nacionalidad || "—"}
            </Typography>
          </li>
          <li>
            <Typography>
              <b>Fecha de nacimiento:</b> {director.fecha_nacimiento || "—"}
            </Typography>
          </li>
        </Box>

        {Array.isArray(director.peliculas) && director.peliculas.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Películas</Typography>
            <Box component="ul" sx={{ m: 0, pl: 2 }}>
              {director.peliculas.map((p) => (
                <li key={p.id}>
                  <Typography>{p.titulo}</Typography>
                </li>
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
