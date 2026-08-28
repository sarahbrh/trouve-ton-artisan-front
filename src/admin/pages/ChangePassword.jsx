import { useState } from "react";
import adminApi from "../services/adminApi";

function ChangePassword() {
  const [ancienMotDePasse, setAncienMotDePasse] = useState("");
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState(null);
  const [erreur, setErreur] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErreur("");
    setMessage(null);

    if (nouveauMotDePasse !== confirmation) {
      setErreur("Les deux mots de passe ne correspondent pas.");
      return;
    }

    try {
      await adminApi.put("/admin/change-password", {
        ancien_mot_de_passe: ancienMotDePasse,
        nouveau_mot_de_passe: nouveauMotDePasse,
      });
      setMessage("Mot de passe mis à jour avec succès.");
      setAncienMotDePasse("");
      setNouveauMotDePasse("");
      setConfirmation("");
    } catch (err) {
      setErreur(err.response?.data?.message || "Une erreur est survenue.");
    }
  }

  return (
    <div>
      <h1 className="h3 mb-4">Changer mon mot de passe</h1>

      <form
        onSubmit={handleSubmit}
        className="card p-3"
        style={{ maxWidth: "400px" }}
      >
        <div className="mb-3">
          <label className="form-label">Ancien mot de passe</label>
          <input
            type="password"
            className="form-control"
            value={ancienMotDePasse}
            onChange={(e) => setAncienMotDePasse(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nouveau mot de passe</label>
          <input
            type="password"
            className="form-control"
            value={nouveauMotDePasse}
            onChange={(e) => setNouveauMotDePasse(e.target.value)}
            required
            minLength={8}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Confirmer le nouveau mot de passe
          </label>
          <input
            type="password"
            className="form-control"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            required
          />
        </div>

        {message && <p className="text-success small">{message}</p>}
        {erreur && <p className="text-danger small">{erreur}</p>}

        <button type="submit" className="btn btn-primary">
          Mettre à jour
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
