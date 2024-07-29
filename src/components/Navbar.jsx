import { NavLink, useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa"; // Import the icon

export const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("recipe_token");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-l from-blue-700 via-blue-500 to-blue-300 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            {/* Icon and Brand Name */}
            <FaUtensils className="text-white text-3xl" />
            <NavLink
              to="/"
              className="text-white text-2xl font-bold hover:text-gray-300"
            >
              Recipe Book
            </NavLink>
          </div>
          <div className="flex-grow flex items-center justify-center space-x-6">
            <NavLink className="text-white hover:text-gray-300" to={"/recipes"}>
              All Recipes
            </NavLink>
            <NavLink
              className="text-white hover:text-gray-300"
              to={"/create-recipe"}
            >
              Create A Recipe
            </NavLink>
            <NavLink className="text-white hover:text-gray-300" to={"/mine"}>
              My Recipes
            </NavLink>
          </div>
          {localStorage.getItem("recipe_token") ? (
            <div>
              <button
                className="text-white hover:text-gray-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <NavLink className="text-white hover:text-gray-300" to={"/login"}>
                Login
              </NavLink>
              <NavLink
                className="text-white hover:text-gray-300"
                to={"/register"}
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
