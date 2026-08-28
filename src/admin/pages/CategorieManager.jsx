import { useEffect, useState } from "react";
import adminApi from "../services/adminApi";

function CategorieManager() {
  const [categories, setCategories] = useState([]);
  const [nom, setNom] = useState("");
  const [idEnEdition, setIdEnEdition] = useState(null);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    charger();
  }, []);

  async function charger() {
    const { data } = await adminApi.get("/categories");
    setCategories(data);
  }

  function commencerEdition(categorie) {
    setIdEnEdition(categorie.id_categorie);
    setNom(categorie.nom);
  }

  function annulerEdition() {
    setIdEnEdition(null);
    setNom("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErreur("");

    try {
      if (idEnEdition) {
        await adminApi.put(`/categories/${idEnEdition}`, { nom });
      } else {
        await adminApi.post("/categories", { nom });
      }
      annulerEdition();
      charger();
    } catch (err) {
      setErreur(err.response?.data?.message || "Une erreur est survenue.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Supprimer cette catégorie ?")) return;
    await adminApi.delete(`/categories/${id}`);
    charger();
  }

  return (
    <div>
      <h1 className="h3 mb-4">Gestion des catégories</h1>

      <form
        onSubmit={handleSubmit}
        className="card p-3 mb-4 d-flex flex-row gap-2 align-items-start"
      >
        <input
          className="form-control"
          placeholder="Nom de la catégorie"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary text-nowrap">
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
      </form>

      {erreur && <p className="text-danger small">{erreur}</p>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id_categorie}>
              <td>{c.nom}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => commencerEdition(c)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(c.id_categorie)}
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

export default CategorieManager;
