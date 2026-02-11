import { useEffect, useState } from "react";
import { Grid, Box, CircularProgress, Container, Typography } from "@mui/material";
import DirectorCard from "../components/DirectorCard";
import { fetchDirectores, deleteDirector } from "../services/directoresService";

export default function DirectoresList() {
  const [directores, setDirectores] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDirectores = () => {
    setLoading(true);
    fetchDirectores()
      .then((data) => {
        const lista = Array.isArray(data) ? data : data?.results || [];
        setDirectores(lista);
      })
      .catch(() => alert("Error obteniendo los directores"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadDirectores();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este director?")) return;
    await deleteDirector(id);
    loadDirectores();
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
          {directores.map((director) => (
            <Grid item key={director.id} xs={12} sm={6} md={4} lg={4} xl={4}>
              <DirectorCard director={director} onDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
