import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import ListeArtisans from "./pages/ListeArtisans";
import FicheArtisan from "./pages/FicheArtisan";
import PageLegale from "./pages/PageLegale";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/categorie/:id" element={<ListeArtisans />} />
        <Route path="/search/:nom" element={<ListeArtisans />} />
        <Route path="/artisan/:id" element={<FicheArtisan />} />
        <Route path="/legal" element={<PageLegale />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
