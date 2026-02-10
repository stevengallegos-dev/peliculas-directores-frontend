import { Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

export default function PeliculaCard({ pelicula, onDelete }) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("access_token") !== null;

  // poster es Base64 en TextField
  const image = pelicula?.poster
    ? (pelicula.poster.startsWith("data:image")
        ? pelicula.poster
        : `data:image/jpeg;base64,${pelicula.poster}`)
    : "https://via.placeholder.com/300";

  return (
    <Card>
      <CardMedia
        component="img"
        sx={{ height: 150, objectFit: "contain" }}
        image={image}
        alt={pelicula?.titulo || "Película"}
      />

      <CardContent>
        <Typography variant="h5">{pelicula?.titulo || "Sin título"}</Typography>
        <Typography variant="body2" color="text.secondary">
          {pelicula?.genero || "Género no registrado"}
        </Typography>
      </CardContent>

      <CardActions sx={{ display: "flex", gap: 1 }}>
        {/* 👇 CAMBIO AQUÍ */}
        <IconButton color="primary" onClick={() => navigate(`/peliculas/${pelicula.id}`)}>
          <VisibilityIcon />
        </IconButton>

        {isLoggedIn && (
          <>
            <IconButton color="primary" onClick={() => navigate(`/edit-pelicula/${pelicula.id}`)}>
              <EditIcon />
            </IconButton>

            <IconButton color="error" onClick={() => onDelete(pelicula.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
}
