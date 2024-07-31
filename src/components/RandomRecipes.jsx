import React, { useEffect, useState } from "react";
import { RecipeCard } from "./RecipeCard"; // Ensure RecipeCard is correctly defined and imported
import { FaPlus } from "react-icons/fa";

export const RandomRecipes = () => {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      description: "Sample",
      is_owner: false,
      ingredients: [{ id: 3, name: "Test" }],
      pictures: [], // Change from 'images' to 'pictures'
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipesFromAPI();
  }, []);

  const fetchRecipesFromAPI = async () => {
    const API_BASE_URL = "https://api.spoonacular.com/recipes/random";
    const API_KEY = "fed8334cd0484e7aad2272f66efeb2e8"; // Replace with your actual Spoonacular API key
    const LIMIT_LICENSE = true;
    const TAGS = "dinner";
    const NUMBER = 1;

    // Construct the URL with query parameters
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
        is_owner: false, // Assuming this is a placeholder or fixed value
        ingredients: recipe.extendedIngredients.map((ingredient, index) => ({
          id: index,
          name: ingredient.name,
        })),
        pictures: recipe.image ? [{ id: recipe.id, image: recipe.image }] : [], // Transform images to match the 'pictures' format
      }));

      setRecipes(formattedRecipes);
    } catch (err) {
      setError("Failed to fetch recipes");
    } finally {
      setLoading(false);
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
