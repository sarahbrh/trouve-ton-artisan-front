import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";

function FicheArtisan() {
  const [artisan, setArtisan] = useState(null);
  const [form, setForm] = useState({
    nom: "",
    email: "",
    objet: "",
    message: "",
  });
  const [succes, setSucces] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://trouve-ton-artisan-api-0gng.onrender.com/api/artisans/${id}`,
      )
      .then((res) => setArtisan(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_jeuut8o",
        "template_qrmb6zi",
        {
          nom: form.nom,
          email: form.email,
          objet: form.objet,
          message: form.message,
        },
        "ST4deWMaIHtc7mDr9",
      )
      .then(() => {
        setSucces(true);
        setForm({ nom: "", email: "", objet: "", message: "" });
      })
      .catch((err) => {
        console.error("Erreur envoi email :", err);
        alert("Une erreur est survenue lors de l'envoi. Réessaie.");
      });
  };

  if (!artisan) return <p className="text-center mt-5">Chargement...</p>;

  return (
    <main>
      <section style={{ backgroundColor: "#00497c", padding: "40px 0" }}>
        <div className="container">
          <h1 style={{ color: "white", fontWeight: "bold" }}>{artisan.nom}</h1>
          <p style={{ color: "white" }}>{artisan.Specialite?.nom}</p>
        </div>
      </section>

      <section style={{ backgroundColor: "white", padding: "60px 0" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div
                style={{
                  backgroundColor: "#f1f8fc",
                  borderRadius: "10px",
                  padding: "30px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#ddd",
                    height: "200px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <span style={{ color: "#888" }}>Photo</span>
                </div>
                <p>⭐ {artisan.note}/5</p>
                <p>📍 {artisan.ville}</p>
                <h5
                  style={{
                    color: "#384050",
                    fontWeight: "bold",
                    marginTop: "20px",
                  }}
                >
                  À propos
                </h5>
                <p>{artisan.a_propos}</p>
                {artisan.site_web ? (
                  <a
                    href={artisan.site_web}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#0074c7" }}
                  >
                    🌐 {artisan.site_web}
                  </a>
                ) : null}
              </div>
            </div>

            <div className="col-md-6">
              <h4
                style={{
                  color: "#384050",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Contacter {artisan.nom}
              </h4>
              {succes ? (
                <div
                  className="alert"
                  style={{ backgroundColor: "#82b864", color: "white" }}
                >
                  Votre message a bien été envoyé !
                </div>
              ) : null}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nom</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Objet</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.objet}
                    onChange={(e) =>
                      setForm({ ...form, objet: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    required
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#0074c7",
                    color: "white",
                    border: "none",
                    padding: "10px 30px",
                    borderRadius: "5px",
                  }}
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default FicheArtisan;
