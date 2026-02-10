import { Card, CardActions, CardContent, CardMedia, Typography, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

export default function DirectorCard({ director, onDelete }) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("access_token") !== null;

  // Como tu foto es Base64 (TextField), basta con usarla directo.
  const image = director?.foto ? director.foto : "https://via.placeholder.com/300";

  return (
    <Card>
      <CardMedia
        component="img"
        sx={{ height: 200, objectFit: "contain" }}
        image={image}
        alt={director?.nombre || "Director"}
      />

      <CardContent>
        <Typography variant="h5">
          {director?.nombre || "Sin nombre"}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {director?.nacionalidad || "Nacionalidad no registrada"}
        </Typography>

        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            {director?.descripcion || "Sin descripción"}
          </Typography>
        </Box>
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

            <IconButton color="error" onClick={() => onDelete(director.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
}
