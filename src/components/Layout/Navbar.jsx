import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main"; // Adjust path as needed
import "./Navbar.css"; // Make sure to update with the styles below or add to your Header.css

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed.");
      setIsAuthorized(true);
    }
  };

  return (
    <header className="header">
      <div className="container">
        {/* Logo and Hamburger */}
        <div className="flex items-center gap-4">
          <button
            className="hamburger md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={28} className="text-white" />
            ) : (
              <Menu size={28} className="text-white" />
            )}
          </button>
          <Link to="/" className="logo">
            Career Connect
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="nav hidden md:flex gap-6 items-center">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/job/getall" className="nav-link">
            All Jobs
          </Link>
          <Link to="/applications/me" className="nav-link">
            {user?.role === "Employer" ? "Applicant's Applications" : "My Applications"}
          </Link>

          {user?.role === "Employer" && (
            <>
              <Link to="/job/post" className="nav-link">
                Post New Job
              </Link>
              <Link to="/job/me" className="nav-link">
                View Your Jobs
              </Link>
            </>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="auth-buttons">
          {isAuthorized ? (
            <button onClick={handleLogout} className="auth-btn secondaryButton">
              Logout
            </button>
          ) : (
            <>
              <Link to="/signup" className="auth-btn primaryButton">
                Sign Up
              </Link>
              <Link to="/login" className="auth-btn primaryButton">
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <nav className="flex flex-col items-start gap-3 px-4 py-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="mobile-nav-link">
            Home
          </Link>
          <Link to="/job/getall" onClick={() => setIsOpen(false)} className="mobile-nav-link">
            All Jobs
          </Link>
          <Link to="/applications/me" onClick={() => setIsOpen(false)} className="mobile-nav-link">
            {user?.role === "Employer" ? "Applicant's Applications" : "My Applications"}
          </Link>

          {user?.role === "Employer" && (
            <>
              <Link to="/job/post" onClick={() => setIsOpen(false)} className="mobile-nav-link">
                Post New Job
              </Link>
              <Link to="/job/me" onClick={() => setIsOpen(false)} className="mobile-nav-link">
                View Your Jobs
              </Link>
            </>
          )}

          {isAuthorized ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="auth-btn secondaryButton w-full text-left"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/signup" onClick={() => setIsOpen(false)} className="mobile-nav-link">
                Sign Up
              </Link>
              <Link to="/login" onClick={() => setIsOpen(false)} className="mobile-nav-link">
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
