import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Remove this import if it's not needed for other styles

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <ul className="flex flex-wrap justify-left pb-10">
      <li className="flex-basis-1/5 list-none pl-10">
        <NavLink
          className="text-left underline text-green-600 hover:text-purple-700"
          to={"/recipes"}
        >
          All Recipes
        </NavLink>
      </li>
      <li className="flex-basis-1/5 list-none">
        <NavLink
          className="text-left underline text-green-600 hover:text-purple-700"
          to={"/create"}
        >
          Create A Recipe
        </NavLink>
      </li>
      <li className="flex-basis-1/5 list-none">
        <NavLink
          className="text-left underline text-green-600 hover:text-purple-700"
          to={"/mine"}
        >
          My Recipes
        </NavLink>
      </li>
      {localStorage.getItem("recipe_token") !== null ? (
        <li className="flex-basis-1/5 list-none">
          <button
            className="underline text-green-600 hover:text-purple-700"
            onClick={() => {
              localStorage.removeItem("recipe_token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </li>
      ) : (
        <>
          <li className="flex-basis-1/5 list-none">
            <NavLink
              className="text-left underline text-green-600 hover:text-purple-700"
              to={"/login"}
            >
              Login
            </NavLink>
          </li>
          <li className="flex-basis-1/5 list-none">
            <NavLink
              className="text-left underline text-green-600 hover:text-purple-700"
              to={"/register"}
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};
