import { Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

export default function DirectorCard({ director, onDelete }) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("access_token") !== null;

  const image = director?.foto ? director.foto : "https://via.placeholder.com/300";

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: 4,
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={image}
        alt={director?.nombre || "Director"}
        sx={{
          objectFit: "contain",
          backgroundColor: "#f8fafc",
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
          {(director?.nombre || "Sin nombre") +
            " — " +
            (director?.nacionalidad || "Nacionalidad")}
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
        <IconButton size="small" color="primary" onClick={() => navigate(`/director/${director.id}`)}>
          <VisibilityIcon fontSize="small" />
        </IconButton>

        {isLoggedIn && (
          <>
            <IconButton size="small" color="primary" onClick={() => navigate(`/edit-director/${director.id}`)}>
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton size="small" color="error" onClick={() => onDelete(director.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
}
