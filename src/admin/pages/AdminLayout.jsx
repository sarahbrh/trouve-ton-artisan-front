import { NavLink, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 bg-dark min-vh-100 p-3">
          <h2 className="h5 text-white mb-4">Administration</h2>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <NavLink to="/admin/artisans" className="nav-link text-white">
                Artisans
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink to="/admin/categories" className="nav-link text-white">
                Catégories
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink to="/admin/specialites" className="nav-link text-white">
                Spécialités
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink to="/admin/mot-de-passe" className="nav-link text-white">
                Changer mon mot de passe
              </NavLink>
            </li>
          </ul>
          <button
            className="btn btn-outline-light btn-sm mt-4"
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </nav>

        <main className="col-md-10 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
