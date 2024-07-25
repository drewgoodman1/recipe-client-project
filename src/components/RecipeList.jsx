import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RecipeList = ({ recipes, fetchRecipes }) => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = async (recipeId) => {
    const token = localStorage.getItem("recipe_token");
    const response = await fetch(`http://localhost:8000/recipes/${recipeId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${JSON.parse(token)}`,
      },
    });

    if (response.ok) {
      fetchRecipes(); // Refresh the list after delete
    } else {
      console.error("Failed to delete recipe:", response.statusText);
    }
  };

  const displayRecipes = () => {
    if (recipes && recipes.length) {
      return recipes.map((recipe) => (
        <div
          key={`key-${recipe.id}`}
          className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50"
        >
          <h2 className="text-xl font-bold">{recipe.description}</h2>
          <p>Owner: {recipe.is_owner ? "Yes" : "No"}</p>
          <ul className="list-disc pl-5">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.name}</li>
            ))}
          </ul>
          {recipe.is_owner && (
            <div className="flex space-x-2 mt-3">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={() => navigate(`/edit-recipe/${recipe.id}`)}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={() => handleDelete(recipe.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ));
    }

    return <h3>Loading Recipes...</h3>;
  };

  return (
    <>
      <h1 className="text-3xl">Recipe List</h1>
      {displayRecipes()}
    </>
  );
};
