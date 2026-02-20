import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, logout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
        className="navbar navbar-dark shadow-sm"
        style={{
            background: "linear-gradient(90deg, #ff7eb3, #7a5cff)"
    }}
>

      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🔗 URL Shortener
        </Link>

        <div>
          {!user ? (
            <>
              <Link className="btn btn-light me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-warning" to="/signup">
                Signup
              </Link>
            </>
          ) : (
            <>

            <span className="text-white fw-semibold me-3">
                Welcome, {user.name} 👋
            </span>

              <button className="btn btn-dark" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
