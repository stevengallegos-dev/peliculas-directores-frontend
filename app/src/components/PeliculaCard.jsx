import { Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

export default function PeliculaCard({ pelicula, onDelete }) {
  const navigate = useNavigate();
  const mediaUrl = import.meta.env.VITE_MEDIA_URL;
  const isLoggedIn = localStorage.getItem("access_token") !== null;

  const image = pelicula.poster
    ? `${mediaUrl}/${pelicula.poster}`
    : "https://via.placeholder.com/300";

  return (
    <Card>
      <CardMedia
        component="img"
        sx={{ height: 150, objectFit: "contain" }}
        image={image}
        alt={pelicula.titulo}
      />

      <CardContent>
        <Typography variant="h5">{pelicula.titulo}</Typography>
      </CardContent>

      <CardActions sx={{ display: "flex", gap: 1 }}>
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
