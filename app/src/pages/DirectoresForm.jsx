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
    nacionalidad: "",
    descripcion: "",
    foto: null, // File
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    setLoading(true);
    fetchDirectorById(id)
      .then((data) => {
        setDirectorData({
          nombre: data.nombre || "",
          nacionalidad: data.nacionalidad || "",
          descripcion: data.descripcion || "",
          foto: null, // no cargamos foto existente (solo si el usuario selecciona nueva)
        });
      })
      .catch(() => alert("Error cargando el director"))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "foto") {
      setDirectorData((prev) => ({ ...prev, foto: files?.[0] || null }));
      return;
    }

    setDirectorData((prev) => ({ ...prev, [name]: value }));
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
    } catch (err) {
      console.error(err);
      alert("Error al guardar el director");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {isEdit ? "Editar Director" : "Crear Director"}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 520 }}
      >
        <TextField
          label="Nombre"
          name="nombre"
          onChange={handleChange}
          value={directorData.nombre}
          required
          fullWidth
        />

        <TextField
          label="Nacionalidad"
          name="nacionalidad"
          onChange={handleChange}
          value={directorData.nacionalidad}
          fullWidth
        />

        <TextField
          label="Descripción"
          name="descripcion"
          onChange={handleChange}
          value={directorData.descripcion}
          multiline
          rows={4}
          fullWidth
        />

        <input type="file" name="foto" accept="image/*" onChange={handleChange} />

        <Button variant="contained" type="submit">
          Guardar
        </Button>
      </Box>
    </>
  );
}
