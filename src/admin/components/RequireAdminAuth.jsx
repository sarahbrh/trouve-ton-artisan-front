import { Navigate } from "react-router-dom";

// Empêche l'accès aux pages admin si aucun token n'est présent.
// Ne vérifie pas la validité du token ici (ça, l'API s'en charge à chaque requête) :
// juste sa présence, pour éviter d'afficher les pages à un visiteur non connecté.
function RequireAdminAuth({ children }) {
  const token = localStorage.getItem("admin_token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default RequireAdminAuth;
