import { useEffect, useState } from "react";
import adminApi from "../services/adminApi";

const FORM_VIDE = { nom: "", id_categorie: "" };

function SpecialiteManager() {
  const [specialites, setSpecialites] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(FORM_VIDE);
  const [idEnEdition, setIdEnEdition] = useState(null);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    chargerSpecialites();
    chargerCategories();
  }, []);

  async function chargerSpecialites() {
    const { data } = await adminApi.get("/specialites");
    setSpecialites(data);
  }

  async function chargerCategories() {
    const { data } = await adminApi.get("/categories");
    setCategories(data);
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function commencerEdition(specialite) {
    setIdEnEdition(specialite.id_specialite);
    setForm({
      nom: specialite.nom,
      id_categorie: specialite.Categorie?.id_categorie || "",
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
        await adminApi.put(`/specialites/${idEnEdition}`, form);
      } else {
        await adminApi.post("/specialites", form);
      }
      annulerEdition();
      chargerSpecialites();
    } catch (err) {
      setErreur(err.response?.data?.message || "Une erreur est survenue.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Supprimer cette spécialité ?")) return;
    await adminApi.delete(`/specialites/${id}`);
    chargerSpecialites();
  }

  return (
    <div>
      <h1 className="h3 mb-4">Gestion des spécialités</h1>

      <form
        onSubmit={handleSubmit}
        className="card p-3 mb-4 row g-2 align-items-end"
      >
        <div className="col-md-5">
          <input
            name="nom"
            className="form-control"
            placeholder="Nom de la spécialité"
            value={form.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-5">
          <select
            name="id_categorie"
            className="form-select"
            value={form.id_categorie}
            onChange={handleChange}
            required
          >
            <option value="">-- Choisir une catégorie --</option>
            {categories.map((c) => (
              <option key={c.id_categorie} value={c.id_categorie}>
                {c.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2 d-flex gap-2">
          <button type="submit" className="btn btn-primary">
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

      {erreur && <p className="text-danger small">{erreur}</p>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Catégorie</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {specialites.map((s) => (
            <tr key={s.id_specialite}>
              <td>{s.nom}</td>
              <td>{s.Categorie?.nom}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => commencerEdition(s)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(s.id_specialite)}
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

export default SpecialiteManager;
