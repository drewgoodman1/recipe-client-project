import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import the specific icons you need
import { useNavigate } from "react-router-dom";

export const RecipeCard = ({ recipe, onDelete }) => {
  const { id, description, ingredients, pictures, is_owner } = recipe;
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-recipe/${id}`);
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-5 border border-gray-200">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          {pictures && pictures.length > 0 ? (
            <img
              className="h-48 w-full object-cover md:h-full md:w-48"
              src={pictures[0].image}
              alt={description}
            />
          ) : (
            <div className="h-48 w-full flex items-center justify-center bg-gray-200 md:h-full md:w-48">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>
        <div className="p-8">
          <h3 className="block mt-1 text-lg leading-tight font-semibold text-gray-900">
            {description}
          </h3>
          <p className="mt-2 text-gray-500">Owner: {is_owner ? "Yes" : "No"}</p>
          <div className="mt-4">
            <h4 className="text-sm font-bold text-gray-700">Ingredients:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {ingredients.length > 0 ? (
                ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.name}</li>
                ))
              ) : (
                <li>No ingredients listed</li>
              )}
            </ul>
          </div>
          {is_owner && (
            <div className="mt-4 flex space-x-2">
              <button
                className="flex items-center px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                onClick={handleEdit}
              >
                <FaEdit />
              </button>
              <button
                className="flex items-center px-2 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
                onClick={() => onDelete(id)}
              >
                <FaTrashAlt />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
