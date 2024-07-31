import React, { useEffect, useState } from "react";
import { RecipeCard } from "./RecipeCard";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Assuming you are using React Router

export const RandomRecipes = () => {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      description: "Sample",
      is_owner: false,
      ingredients: [{ id: 3, name: "Test" }],
      pictures: [],
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    fetchRecipesFromAPI();
  }, []);

  const fetchRecipesFromAPI = async () => {
    const API_BASE_URL = "https://api.spoonacular.com/recipes/random";
    const API_KEY = "fed8334cd0484e7aad2272f66efeb2e8";
    const LIMIT_LICENSE = true;
    const TAGS = "dinner";
    const NUMBER = 1;

    const url = `${API_BASE_URL}?apiKey=${API_KEY}&limitLicense=${LIMIT_LICENSE}&tags=${TAGS}&number=${NUMBER}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const formattedRecipes = data.recipes.map((recipe) => ({
        id: recipe.id,
        description: recipe.title,
        is_owner: false,
        ingredients: recipe.extendedIngredients.map((ingredient, index) => ({
          id: index,
          name: ingredient.name,
        })),
        pictures: recipe.image ? [{ id: recipe.id, image: recipe.image }] : [],
      }));

      setRecipes(formattedRecipes);
    } catch (err) {
      setError("Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  };

  const saveRecipe = async (recipe) => {
    try {
      const token = localStorage.getItem("recipe_token");
      const url = "http://localhost:8000/recipes";

      // Extracting necessary fields and formatting them correctly
      const recipeData = {
        description: recipe.description,
        ingredients: recipe.ingredients.map((ingredient) => ({
          id: ingredient.id, // Ensure this matches your backend's expected format
          name: ingredient.name,
        })),
        images: recipe.pictures.map((pic) => pic.image), // Assuming the backend expects just the image URLs
        is_owner: false, // Adjust according to your logic
      };

      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Token ${JSON.parse(token)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      // Refresh the recipes or navigate as needed
      navigate("/recipes");
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Random Recipes</h2>
      <div>
        {recipes.map((recipe) => (
          <div key={recipe.id} className="mb-6">
            <RecipeCard recipe={recipe} />
            <div className="flex justify-center mt-2">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                onClick={() => saveRecipe(recipe)}
              >
                <FaPlus className="mr-2" /> Save Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
