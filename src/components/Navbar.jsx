import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUtensils, FaBars, FaTimes } from "react-icons/fa";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("recipe_token");
    navigate("/login");
  };

  return (
    <nav className="relative bg-white shadow-md h-16">
      {/* Image in the background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/food_nav.jpeg')" }}
      ></div>
      {/* Optional semi-transparent overlay for better text visibility */}
      <div className="absolute inset-0 bg-white opacity-90"></div>
      <div className="relative container mx-auto px-4 flex items-center justify-between h-full z-10">
        <div className="flex items-center space-x-4">
          <FaUtensils className="text-gray-800 text-2xl" />
          <NavLink
            to="/"
            className="text-gray-800 text-xl font-bold hover:text-gray-500"
          >
            Recipe Book
          </NavLink>
        </div>
        <div className="md:hidden">
          <button
            className="text-gray-800 text-3xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div
          className={`md:flex items-center justify-center md:space-x-6 ${isOpen ? "block" : "hidden"} w-full md:w-auto`}
        >
          <NavLink
            className="text-gray-800 hover:text-gray-500 block md:inline-block mt-4 md:mt-0"
            to="/recipes"
          >
            All Recipes
          </NavLink>
          <NavLink
            className="text-gray-800 hover:text-gray-500 block md:inline-block mt-4 md:mt-0"
            to="/myrecipes"
          >
            My Recipes
          </NavLink>
          <NavLink
            className="text-gray-800 hover:text-gray-500 block md:inline-block mt-4 md:mt-0"
            to="/create-recipe"
          >
            Create A Recipe
          </NavLink>
          <NavLink
            className="text-gray-800 hover:text-gray-500 block md:inline-block mt-4 md:mt-0"
            to="/random"
          >
            Recipe Ideas
          </NavLink>
        </div>
        <div className="flex items-center space-x-4">
          {localStorage.getItem("recipe_token") ? (
            <button
              className="text-gray-800 hover:text-gray-500 block md:inline-block mt-4 md:mt-0"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                className="text-gray-800 hover:text-gray-500 block md:inline-block mt-4 md:mt-0"
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className="text-gray-800 hover:text-gray-500 block md:inline-block mt-4 md:mt-0"
                to="/register"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
