import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import ListeArtisans from "./pages/ListeArtisans";
import FicheArtisan from "./pages/FicheArtisan";
import PageLegale from "./pages/PageLegale";
import NotFound from "./pages/NotFound";

// Espace admin (back-office)
import AdminLogin from "./admin/pages/AdminLogin";
import AdminLayout from "./admin/pages/AdminLayout";
import ArtisanManager from "./admin/pages/ArtisanManager";
import CategorieManager from "./admin/pages/CategorieManager";
import SpecialiteManager from "./admin/pages/SpecialiteManager";
import ChangePassword from "./admin/pages/ChangePassword";
import RequireAdminAuth from "./admin/components/RequireAdminAuth";

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

        {/* Espace admin : route "secrète", jamais liée depuis la navigation publique */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAdminAuth>
              <AdminLayout />
            </RequireAdminAuth>
          }
        >
          <Route path="artisans" element={<ArtisanManager />} />
          <Route path="categories" element={<CategorieManager />} />
          <Route path="specialites" element={<SpecialiteManager />} />
          <Route path="mot-de-passe" element={<ChangePassword />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
