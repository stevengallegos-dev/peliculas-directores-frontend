import { Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

export default function DirectorCard({ director, onDelete }) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("access_token") !== null;
  const mediaUrl = import.meta.env.VITE_MEDIA_URL;

  let image = "https://via.placeholder.com/300";
  if (director.foto) {
    image = director.foto.startsWith("data:image")
      ? director.foto
      : `${mediaUrl}/${director.foto
          .replace(/^\/+/, "")
          .replace(/^media\/?/, "")}`;
  }

  return (
    <Card>
      <CardMedia
        component="img"
        sx={{ height: 200, objectFit: "contain" }}
        image={image}
        alt={director.nombre}
      />

      <CardContent>
        <Typography variant="h5">
          {director.nombre} {director.apellido}
        </Typography>
      </CardContent>

      <CardActions sx={{ display: "flex", gap: 1 }}>
        <IconButton
          color="primary"
          onClick={() => navigate(`/director/${director.id}`)}
        >
          <VisibilityIcon />
        </IconButton>

        {isLoggedIn && (
          <>
            <IconButton
              color="primary"
              onClick={() => navigate(`/edit-director/${director.id}`)}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              color="error"
              onClick={() => onDelete(director.id)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
}
