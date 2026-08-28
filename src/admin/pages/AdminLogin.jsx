import { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminApi from "../services/adminApi";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErreur("");
    setChargement(true);

    try {
      const { data } = await adminApi.post("/admin/login", {
        email,
        mot_de_passe: motDePasse,
      });
      localStorage.setItem("admin_token", data.token);
      navigate("/admin");
    } catch (err) {
      setErreur("Email ou mot de passe incorrect.");
    } finally {
      setChargement(false);
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h1 className="h4 mb-4 text-center">Espace administrateur</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mot_de_passe" className="form-label">
              Mot de passe
            </label>
            <input
              type="password"
              id="mot_de_passe"
              className="form-control"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {erreur && <p className="text-danger small">{erreur}</p>}

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={chargement}
          >
            {chargement ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
