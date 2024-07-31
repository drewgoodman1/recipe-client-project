import React, { useEffect } from "react";
import { RecipeCard } from "./RecipeCard";

export const RecipeList = ({ recipes, fetchRecipes }) => {
  useEffect(() => {
    fetchRecipes(); // Fetch recipes on component mount
  }, []); // Include fetchRecipes in dependency array to avoid eslint warning

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
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onDelete={handleDelete}
          fetchRecipes={fetchRecipes} // Pass fetchRecipes to RecipeCard
        />
      ));
    }

    return <h3>Loading Recipes...</h3>;
  };

  return (
    <>
      <h1 className="text-3xl">All Recipes</h1>
      {displayRecipes()}
    </>
  );
};
