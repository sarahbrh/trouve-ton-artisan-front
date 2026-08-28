import { useEffect, useState } from "react";
import adminApi from "../services/adminApi";

const FORM_VIDE = {
  nom: "",
  note: "",
  ville: "",
  a_propos: "",
  email: "",
  site_web: "",
  top: false,
  id_specialite: "",
};

function ArtisanManager() {
  const [artisans, setArtisans] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [form, setForm] = useState(FORM_VIDE);
  const [idEnEdition, setIdEnEdition] = useState(null);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    chargerArtisans();
    chargerSpecialites();
  }, []);

  async function chargerArtisans() {
    const { data } = await adminApi.get("/artisans");
    setArtisans(data);
  }

  async function chargerSpecialites() {
    const { data } = await adminApi.get("/specialites");
    setSpecialites(data);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function commencerEdition(artisan) {
    setIdEnEdition(artisan.id_artisan);
    setForm({
      nom: artisan.nom || "",
      note: artisan.note || "",
      ville: artisan.ville || "",
      a_propos: artisan.a_propos || "",
      email: artisan.email || "",
      site_web: artisan.site_web || "",
      top: artisan.top || false,
      id_specialite: artisan.Specialite?.id_specialite || "",
    });
  }

  function annulerEdition() {
    setIdEnEdition(null);
    setForm(FORM_VIDE);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErreur("");

    try {
      if (idEnEdition) {
        await adminApi.put(`/artisans/${idEnEdition}`, form);
      } else {
        await adminApi.post("/artisans", form);
      }
      annulerEdition();
      chargerArtisans();
    } catch (err) {
      setErreur(err.response?.data?.message || "Une erreur est survenue.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Supprimer cet artisan ?")) return;
    await adminApi.delete(`/artisans/${id}`);
    chargerArtisans();
  }

  return (
    <div>
      <h1 className="h3 mb-4">Gestion des artisans</h1>

      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <h2 className="h5">
          {idEnEdition ? "Modifier l'artisan" : "Ajouter un artisan"}
        </h2>

        <div className="row g-2">
          <div className="col-md-4">
            <input
              name="nom"
              className="form-control"
              placeholder="Nom"
              value={form.nom}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <select
              name="id_specialite"
              className="form-select"
              value={form.id_specialite}
              onChange={handleChange}
              required
            >
              <option value="">-- Choisir une spécialité --</option>
              {specialites.map((s) => (
                <option key={s.id_specialite} value={s.id_specialite}>
                  {s.nom}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <input
              name="ville"
              className="form-control"
              placeholder="Ville"
              value={form.ville}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <input
              name="site_web"
              className="form-control"
              placeholder="Site web"
              value={form.site_web}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <input
              name="note"
              type="number"
              step="0.1"
              min="0"
              max="5"
              className="form-control"
              placeholder="Note (/5)"
              value={form.note}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <textarea
              name="a_propos"
              className="form-control"
              placeholder="À propos"
              value={form.a_propos}
              onChange={handleChange}
              rows={2}
            />
          </div>
          <div className="col-12 form-check">
            <input
              type="checkbox"
              name="top"
              id="top"
              className="form-check-input"
              checked={form.top}
              onChange={handleChange}
            />
            <label htmlFor="top" className="form-check-label">
              Artisan du mois (mis en avant)
            </label>
          </div>
        </div>

        {erreur && <p className="text-danger small mt-2">{erreur}</p>}

        <div className="mt-3">
          <button type="submit" className="btn btn-primary me-2">
            {idEnEdition ? "Enregistrer" : "Ajouter"}
          </button>
          {idEnEdition && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={annulerEdition}
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Spécialité</th>
            <th>Ville</th>
            <th>Note</th>
            <th>Top</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {artisans.map((a) => (
            <tr key={a.id_artisan}>
              <td>{a.nom}</td>
              <td>{a.Specialite?.nom}</td>
              <td>{a.ville}</td>
              <td>{a.note}</td>
              <td>{a.top ? "✅" : ""}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => commencerEdition(a)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(a.id_artisan)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ArtisanManager;
