import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addDirector, fetchDirectorById, updateDirector } from "../services/directoresService";
import Spinner from "../components/Spinner";

export default function DirectoresForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [directorData, setDirectorData] = useState({
    nombre: "",
    apellido: "",
    nivel: "",
    fecha_nacimiento: "",
    foto: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    setLoading(true);
    fetchDirectorById(id)
      .then((data) => {
        setDirectorData({
          nombre: data.nombre || "",
          apellido: data.apellido || "",
          nivel: data.nivel || "",
          fecha_nacimiento: data.fecha_nacimiento || "",
          foto: null,
        });
      })
      .catch(() => alert("Error cargando el director"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "foto") {
      setDirectorData({ ...directorData, foto: files[0] });
    } else {
      setDirectorData({ ...directorData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (isEdit) {
        await updateDirector(id, directorData);
        alert("Director actualizado exitosamente");
      } else {
        await addDirector(directorData);
        alert("Director agregado exitosamente");
      }

      navigate("/directores");
    } catch {
      alert("Error al guardar el director");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {isEdit ? "Editar Director." : "Formulario de Director."}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Nombre"
          name="nombre"
          onChange={handleChange}
          value={directorData.nombre}
        />

        <TextField
          label="Apellido"
          name="apellido"
          onChange={handleChange}
          value={directorData.apellido}
        />

        <TextField
          label="Nivel"
          name="nivel"
          type="number"
          onChange={handleChange}
          value={directorData.nivel}
        />

        <TextField
          label="Fecha de nacimiento"
          name="fecha_nacimiento"
          type="date"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
          value={directorData.fecha_nacimiento}
        />

        <input type="file" name="foto" onChange={handleChange} />

        <Button variant="contained" type="submit">
          Guardar
        </Button>
      </Box>
    </>
  );
}
