import { Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

export default function PeliculaCard({ pelicula, onDelete }) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("access_token") !== null;

  const image = pelicula?.poster
    ? pelicula.poster.startsWith("data:image")
      ? pelicula.poster
      : `data:image/jpeg;base64,${pelicula.poster}`
    : "https://via.placeholder.com/300";

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: 4, // 👈 igual que Directores
      }}
    >
      <CardMedia
        component="img"
        height="250" // 👈 igual que Directores
        image={image}
        alt={pelicula?.titulo || "Película"}
        sx={{
          objectFit: "contain", // 👈 igual que Directores (no recorta)
          backgroundColor: "#f8fafc", // 👈 igual que Directores
        }}
      />

      <CardContent sx={{ pb: 0 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {(pelicula?.titulo || "Sin título") + " — " + (pelicula?.genero || "Género")}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          flexWrap: "nowrap",
          pb: 1,
        }}
      >
        <IconButton size="small" color="primary" onClick={() => navigate(`/peliculas/${pelicula.id}`)}>
          <VisibilityIcon fontSize="small" />
        </IconButton>

        {isLoggedIn && (
          <>
            <IconButton size="small" color="primary" onClick={() => navigate(`/edit-pelicula/${pelicula.id}`)}>
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton size="small" color="error" onClick={() => onDelete(pelicula.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
}
