import { useEffect, useState } from "react";
import { Grid, Box, CircularProgress } from "@mui/material";
import DirectorCard from "../components/DirectorCard";
import { fetchDirectores, deleteDirector } from "../services/directoresService";

export default function DirectoresList() {
  const [directores, setDirectores] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDirectores = () => {
    setLoading(true);
    fetchDirectores()
      .then((data) => {
        const lista = Array.isArray(data) ? data : (data?.results || []);
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
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Grid container spacing={2} marginTop={2}>
      {Array.isArray(directores) &&
        directores.map((director) => (
          <Grid key={director.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <DirectorCard director={director} onDelete={handleDelete} />
          </Grid>
        ))}
    </Grid>
  );
}
