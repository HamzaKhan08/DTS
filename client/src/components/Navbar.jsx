import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { path: "/", icon: "fas fa-home", text: "Home" },
    // { path: "/documents", icon: "fas fa-file-alt", text: "Documents" },
    // { path: "/reports", icon: "fas fa-file", text: "Reports" },
    // { path: "/settings", icon: "fas fa-cog", text: "Settings" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="relative text-2xl font-bold bg-gradient-to-r from-orange-900 via-white to-green-600 bg-clip-text text-transparent text-gradient-animate group"
              >
                TrackVaults<i className="text-sm">.com</i>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map(({ path, icon, text }) => (
                <Link
                  key={path}
                  to={path}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200
                    ${
                      isActive(path)
                        ? "text-orange-500"
                        : "text-orange-400 hover:text-orange-500"
                    }`}
                >
                  <i className={`${icon} mr-2`}></i>
                  {text}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-orange-500 font-medium">
                  Welcome, {user.username}!
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white bg-orange-400 hover:bg-orange-500 hover:text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {navLinks.map(({ path, icon, text }) => (
            <Link
              key={path}
              to={path}
              className={`block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200
                ${
                  isActive(path)
                    ? "text-white bg-orange-500 border-l-4"
                    : "text-white hover:text-orange-500 hover:bg-orange-400 hover:border-l-4"
                }`}
            >
              <i className={`${icon} mr-2`}></i>
              {text}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
