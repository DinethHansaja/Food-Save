import { Link, useNavigate } from "react-router-dom";
import "../../styles/common/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("foodSaveUser");

  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("foodSaveUser");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          FoodSave
        </Link>

        {/* Navigation Links */}
        <div className="navbar-links">

          <Link to="/home">
            Home
          </Link>

          <Link to="/food">
            Browse Food
          </Link>

          {/* Business Navigation */}
          {user &&
            (user.role === "business" ||
              user.role === "admin") && (
              <>
                <Link to="/business/add-food">
                  Add Food
                </Link>

                <Link to="/business/requests">
                  Requests
                </Link>
              </>
            )}

          {/* Recipient Navigation */}
          {user &&
            (user.role === "recipient" ||
              user.role === "admin") && (
              <Link to="/recipient/requests">
                My Requests
              </Link>
            )}

          <Link to="/about">
            About
          </Link>

        </div>

        {/* Right Side */}
        <div className="navbar-actions">

          {!user ? (
            <>
              <Link
                to="/login"
                className="login-btn"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="register-btn"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <span className="navbar-user">
                Hi, {user.name}
              </span>

              <button
                type="button"
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;