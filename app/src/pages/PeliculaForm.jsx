import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addPelicula, fetchPeliculaById, updatePelicula } from "../services/peliculasService";
import Spinner from "../components/Spinner";

export default function PeliculaForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [peliculaData, setPeliculaData] = useState({
    titulo: "",
    genero: "",
    duracion: "",
    fecha_estreno: "",
    poster: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    setLoading(true);
    fetchPeliculaById(id)
      .then((data) => {
        setPeliculaData({
          titulo: data.titulo || "",
          genero: data.genero || "",
          duracion: data.duracion || "",
          fecha_estreno: data.fecha_estreno || "",
          poster: null,
        });
      })
      .catch(() => alert("Error cargando la película"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "poster") {
      setPeliculaData({ ...peliculaData, poster: files[0] });
    } else {
      setPeliculaData({ ...peliculaData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (isEdit) {
        const updated = await updatePelicula(id, peliculaData);
        alert("Película actualizada exitosamente");
        console.log(updated);
      } else {
        const created = await addPelicula(peliculaData);
        alert("Película agregada exitosamente");
        console.log(created);
      }

      navigate("/");
    } catch (error) {
      console.log("STATUS:", error?.response?.status);
      console.log("DATA:", error?.response?.data);
      console.log("HEADERS:", error?.response?.headers);
      alert("Error al guardar la película");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {isEdit ? "Editar Película." : "Formulario de Película."}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Título"
          name="titulo"
          variant="outlined"
          onChange={handleChange}
          value={peliculaData.titulo}
        />

        <TextField
          select
          label="Género"
          name="genero"
          variant="outlined"
          onChange={handleChange}
          value={peliculaData.genero}
        >
          <MenuItem value="Acción">Acción</MenuItem>
          <MenuItem value="Comedia">Comedia</MenuItem>
          <MenuItem value="Drama">Drama</MenuItem>
          <MenuItem value="Terror">Terror</MenuItem>
          <MenuItem value="Ciencia ficción">Ciencia ficción</MenuItem>
        </TextField>

        <TextField
          label="Duración (min)"
          name="duracion"
          variant="outlined"
          onChange={handleChange}
          value={peliculaData.duracion}
        />

        <TextField
          label="Fecha de estreno"
          name="fecha_estreno"
          type="date"
          variant="outlined"
          onChange={handleChange}
          value={peliculaData.fecha_estreno}
          InputLabelProps={{ shrink: true }}
        />

        <input type="file" name="poster" onChange={handleChange} />

        <Button variant="contained" type="submit">
          Guardar
        </Button>
      </Box>
    </>
  );
}
