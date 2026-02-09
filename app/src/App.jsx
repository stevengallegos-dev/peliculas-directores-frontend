import { Container } from "@mui/material";
import Header from "./components/Header";

import PeliculaList from "./pages/PeliculaList";
import PeliculaForm from "./pages/PeliculaForm";
import PeliculaDetalle from "./pages/PeliculaDetalle";

import DirectoresList from "./pages/DirectoresList";
import DirectoresForm from "./pages/DirectoresForm";
import DirectoresDetalle from "./pages/DirectoresDetalle";

import LoginPage from "./pages/LoginPage";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Routes>
          {/* Películas */}
          <Route path="/" element={<PeliculaList />} />
          <Route path="/add-pelicula" element={<PeliculaForm />} />
          <Route path="/edit-pelicula/:id" element={<PeliculaForm />} />
          <Route path="/peliculas/:id" element={<PeliculaDetalle />} />

          {/* Directores */}
          <Route path="/directores" element={<DirectoresList />} />
          <Route path="/add-director" element={<DirectoresForm />} />
          <Route path="/edit-director/:id" element={<DirectoresForm />} />
          <Route path="/director/:id" element={<DirectoresDetalle />} />

          {/* Login */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
