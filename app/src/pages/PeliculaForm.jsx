import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addPelicula, fetchPeliculaById, updatePelicula } from "../services/peliculasService";
import { fetchDirectores } from "../services/directoresService";
import Spinner from "../components/Spinner";

// Convierte archivo a Base64 (con prefijo data:image/...)
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); // data:image/...;base64,...
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function PeliculaForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [directores, setDirectores] = useState([]);

  const [peliculaData, setPeliculaData] = useState({
    director: "",
    titulo: "",
    genero: "",
    duracion_min: "",
    fecha_estreno: "",
    poster: "", // Base64 string o ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDirectores()
      .then((data) => setDirectores(data?.results ?? data ?? []))
      .catch(() => alert("Error cargando directores"));
  }, []);

  useEffect(() => {
    if (!isEdit) return;

    setLoading(true);
    fetchPeliculaById(id)
      .then((data) => {
        setPeliculaData({
          director: data.director ?? "",
          titulo: data.titulo || "",
          genero: data.genero || "",
          duracion_min: data.duracion_min ?? "",
          fecha_estreno: data.fecha_estreno || "",
          poster: data.poster || "",
        });
      })
      .catch(() => alert("Error cargando la película"))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "poster" && files?.[0]) {
      const base64 = await fileToBase64(files[0]);
      setPeliculaData((prev) => ({ ...prev, poster: base64 }));
      return;
    }

    setPeliculaData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        director: Number(peliculaData.director),
        titulo: peliculaData.titulo,
        genero: peliculaData.genero,
        fecha_estreno: peliculaData.fecha_estreno || null,
        duracion_min: peliculaData.duracion_min === "" ? null : Number(peliculaData.duracion_min),
        poster: peliculaData.poster || "",
      };

      if (isEdit) {
        await updatePelicula(id, payload);
        alert("Película actualizada exitosamente");
      } else {
        await addPelicula(payload);
        alert("Película agregada exitosamente");
      }

      navigate("/"); // ✅ vuelve al menú/lista (PeliculaList)
    } catch (error) {
      console.log("STATUS:", error?.response?.status);
      console.log("DATA:", error?.response?.data);
      alert("Error al guardar la película");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {isEdit ? "Editar Película" : "Formulario de Película"}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          select
          label="Director"
          name="director"
          value={peliculaData.director}
          onChange={handleChange}
          required
        >
          {directores.map((d) => (
            <MenuItem key={d.id} value={d.id}>
              {d.nombre}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Título"
          name="titulo"
          value={peliculaData.titulo}
          onChange={handleChange}
          required
        />

        <TextField
          select
          label="Género"
          name="genero"
          value={peliculaData.genero}
          onChange={handleChange}
        >
          <MenuItem value="Acción">Acción</MenuItem>
          <MenuItem value="Comedia">Comedia</MenuItem>
          <MenuItem value="Drama">Drama</MenuItem>
          <MenuItem value="Terror">Terror</MenuItem>
          <MenuItem value="Ciencia ficción">Ciencia ficción</MenuItem>
        </TextField>

        <TextField
          label="Duración (min)"
          name="duracion_min"
          type="number"
          value={peliculaData.duracion_min}
          onChange={handleChange}
        />

        <TextField
          label="Fecha de estreno"
          name="fecha_estreno"
          type="date"
          value={peliculaData.fecha_estreno}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <input type="file" name="poster" accept="image/*" onChange={handleChange} />

        <Button variant="contained" type="submit">
          Guardar
        </Button>
      </Box>
    </>
  );
}
