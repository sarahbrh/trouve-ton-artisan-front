import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main>
      <section
        style={{
          backgroundColor: "white",
          padding: "60px 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <div
            style={{
              backgroundColor: "#f1f8fc",
              borderRadius: "10px",
              padding: "20px",
              width: "300px",
              margin: "0 auto 30px",
            }}
          >
            <span style={{ color: "#888" }}>Image</span>
          </div>
          <h1
            style={{ color: "#384050", fontWeight: "bold", fontSize: "100px" }}
          >
            404
          </h1>
          <p style={{ color: "#384050", fontSize: "24px" }}>Page non trouvée</p>
          <p style={{ color: "#384050" }}>
            La page que vous avez demandé n'existe pas.
          </p>
          <Link
            to="/"
            style={{
              backgroundColor: "#0074c7",
              color: "white",
              padding: "10px 30px",
              borderRadius: "5px",
              textDecoration: "none",
              marginTop: "20px",
              display: "inline-block",
            }}
          >
            Retour à l'accueil
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
