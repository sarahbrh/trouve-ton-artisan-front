import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ListeArtisans() {
  const [artisans, setArtisans] = useState([]);
  const [titre, setTitre] = useState("");
  const { id, nom } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/api/artisans/categorie/${id}`)
        .then((res) => {
          setArtisans(res.data);
          if (res.data.length > 0) {
            setTitre(res.data[0].Specialite?.Categorie?.nom);
          }
        })
        .catch((err) => console.error(err));
    } else if (nom) {
      axios
        .get(`http://localhost:3000/api/artisans/search/${nom}`)
        .then((res) => {
          setArtisans(res.data);
          setTitre(`Résultats pour "${nom}"`);
        })
        .catch((err) => console.error(err));
    }
  }, [id, nom]);

  return (
    <main>
      <section style={{ backgroundColor: "#0074c7", padding: "40px 0" }}>
        <div className="container">
          <h1 style={{ color: "white", fontWeight: "bold" }}>{titre}</h1>
          <p style={{ color: "white" }}>
            {artisans.length} artisan(s) trouvé(s)
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: "white", padding: "60px 0" }}>
        <div className="container">
          <div className="row">
            {artisans.length === 0 ? (
              <p className="text-center">Aucun artisan trouvé.</p>
            ) : (
              artisans.map((artisan) => (
                <div className="col-md-4 mb-4" key={artisan.id_artisan}>
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
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ListeArtisans;
