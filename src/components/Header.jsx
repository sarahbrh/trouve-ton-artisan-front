import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://trouve-ton-artisan-api-0gng.onrender.com/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search/${search}`);
    }
  };

  return (
    <header
      className="navbar navbar-expand-lg px-0"
      style={{ backgroundColor: "#f1f8fc" }}
    >
      <div className="container">
        <Link className="navbar-brand me-4" to="/">
          <img src="/logo.png" alt="Trouve ton artisan" height="70" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto me-3">
            {categories.map((cat) => (
              <li className="nav-item" key={cat.id_categorie}>
                <Link
                  className="nav-link"
                  to={`/categorie/${cat.id_categorie}`}
                >
                  {cat.nom}
                </Link>
              </li>
            ))}
          </ul>
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
