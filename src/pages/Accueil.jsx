import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Accueil() {
  const [artisansTop, setArtisansTop] = useState([]);

  useEffect(() => {
    axios
      .get("https://trouve-ton-artisan-api-0gng.onrender.com/api/artisans/top")
      .then((res) => setArtisansTop(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main>
      {/* Hero */}
      <section
        style={{
          backgroundColor: "#0074c7",
          padding: "60px 0",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "white", fontWeight: "bold", fontSize: "48px" }}>
          Trouve ton artisan !
        </h1>
        <p style={{ color: "white", fontSize: "20px" }}>
          Avec la région Auvergne-Rhône-Alpes
        </p>
      </section>

      {/* Comment trouver mon artisan */}
      <section style={{ backgroundColor: "#f1f8fc", padding: "60px 0" }}>
        <div className="container">
          <h2 className="text-center mb-5" style={{ color: "#384050" }}>
            Comment trouver mon artisan ?
          </h2>
          <div className="row text-center">
            {[
              { num: 1, text: "Choisir la catégorie d'artisanat dans le menu" },
              { num: 2, text: "Choisir un artisan" },
              { num: 3, text: "Le contacter via le formulaire de contact" },
              { num: 4, text: "Une réponse sera apportée sous 48h" },
            ].map((etape) => (
              <div className="col-md-3" key={etape.num}>
                <div
                  style={{
                    backgroundColor: "#0074c7",
                    color: "white",
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                    margin: "0 auto 16px",
                  }}
                >
                  {etape.num}
                </div>
                <p style={{ color: "#384050" }}>{etape.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisans du mois */}
      <section style={{ backgroundColor: "white", padding: "60px 0" }}>
        <div className="container">
          <h2 className="text-center mb-5" style={{ color: "#384050" }}>
            Les artisans du mois
          </h2>
          <div className="row">
            {artisansTop.map((artisan) => (
              <div className="col-md-4" key={artisan.id_artisan}>
                <Link
                  to={`/artisan/${artisan.id_artisan}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="card h-100"
                    style={{
                      backgroundColor: "#f1f8fc",
                      border: "none",
                      borderRadius: "10px",
                      padding: "20px",
                    }}
                  >
                    <h5 style={{ color: "#384050", fontWeight: "bold" }}>
                      {artisan.nom}
                    </h5>
                    <p style={{ color: "#0074c7" }}>
                      {artisan.Specialite?.nom}
                    </p>
                    <p style={{ color: "#384050" }}>📍 {artisan.ville}</p>
                    <p>⭐ {artisan.note}/5</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Accueil;
