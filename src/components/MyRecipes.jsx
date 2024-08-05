import React, { useEffect, useState } from "react";
import { RecipeCard } from "./RecipeCard";

export const MyRecipes = () => {
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  const fetchMyRecipes = async () => {
    const token = localStorage.getItem("recipe_token");
    try {
      const response = await fetch("http://localhost:8000/recipes/my-recipes", {
        headers: {
          Authorization: `Token ${JSON.parse(token)}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMyRecipes(data);
      } else {
        console.error("Failed to fetch my recipes:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching my recipes:", error);
    }
  };

  const handleDelete = async (recipeId) => {
    const token = localStorage.getItem("recipe_token");
    try {
      const response = await fetch(
        `http://localhost:8000/recipes/${recipeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${JSON.parse(token)}`,
          },
        }
      );

      if (response.ok) {
        fetchMyRecipes(); // Refresh the list after deletion
      } else {
        console.error("Failed to delete recipe:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleFavorite = async (recipeId) => {
    const token = localStorage.getItem("recipe_token");
    try {
      const response = await fetch(
        `http://localhost:8000/recipes/${recipeId}/favorite`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${JSON.parse(token)}`,
          },
        }
      );

      if (response.ok) {
        fetchMyRecipes(); // Refresh the list after toggling favorite
      } else {
        console.error("Failed to toggle favorite:", response.statusText);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl"></h1>
      {myRecipes.length ? (
        myRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onDelete={handleDelete}
            fetchMyRecipes={fetchMyRecipes} // Pass fetchMyRecipes down
          />
        ))
      ) : (
        <h3>Loading Recipes...</h3>
      )}
    </div>
  );
};
