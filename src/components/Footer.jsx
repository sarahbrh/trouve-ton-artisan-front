import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#384050", color: "white", padding: "40px 0" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <p style={{ fontWeight: "bold" }}>Trouve ton artisan !</p>
            <p style={{ color: "#0074c7", fontSize: "12px" }}>
              Avec la région Auvergne-Rhône-Alpes
            </p>
          </div>
          <div className="col-md-4">
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/legal"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  to="/legal"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Données personnelles
                </Link>
              </li>
              <li>
                <Link
                  to="/legal"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Accessibilité
                </Link>
              </li>
              <li>
                <Link
                  to="/legal"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <p className="mb-1">101 cours Charlemagne</p>
            <p className="mb-1">CS 20033 — 69269 LYON CEDEX 02</p>
            <p className="mb-1">+33 (0)4 26 73 40 00</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
