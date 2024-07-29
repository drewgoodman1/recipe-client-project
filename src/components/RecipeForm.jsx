import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const RecipeForm = ({ fetchRecipes }) => {
  const { id } = useParams(); // Get the recipe ID from the URL if it exists
  const navigate = useNavigate();
  const initialRecipeState = {
    description: "",
    ingredients: [],
    images: [],
  };

  const [ingredients, setIngredients] = useState([]);
  const [newRecipe, setNewRecipe] = useState(initialRecipeState);
  const [loading, setLoading] = useState(true); // For managing loading state
  const [imageBase64, setImageBase64] = useState(""); // State for storing image as Base64 string

  useEffect(() => {
    fetchIngredients();
    fetchRecipe();
  }, [id, navigate]);

  const fetchIngredients = async () => {
    const token = localStorage.getItem("recipe_token");
    const response = await fetch("http://localhost:8000/ingredients", {
      headers: {
        Authorization: `Token ${JSON.parse(token)}`,
      },
    });
    const ingredientsData = await response.json();
    setIngredients(ingredientsData);
  };

  const fetchRecipe = async () => {
    if (id) {
      try {
        const token = localStorage.getItem("recipe_token");
        const response = await fetch(`http://localhost:8000/recipes/${id}`, {
          headers: {
            Authorization: `Token ${JSON.parse(token)}`,
          },
        });
        if (response.ok) {
          const recipeData = await response.json();
          setNewRecipe({
            description: recipeData.description,
            ingredients: recipeData.ingredients.map(
              (ingredient) => ingredient.id
            ),
            images: recipeData.images || [],
          });
        } else if (response.status === 403) {
          alert("You do not have permission to edit this recipe.");
          navigate("/"); // Redirect to home
        } else if (response.status === 404) {
          alert("Recipe not found.");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const createImageString = (event) => {
    getBase64(event.target.files[0], (base64ImageString) => {
      console.log("Base64 of file is", base64ImageString);
      setImageBase64(base64ImageString);
    });
  };

  const saveRecipe = async (evt) => {
    evt.preventDefault();
    const token = localStorage.getItem("recipe_token");
    const url = id
      ? `http://localhost:8000/recipes/${id}`
      : "http://localhost:8000/recipes";
    const method = id ? "PUT" : "POST";

    const recipeData = {
      ...newRecipe,
      images: imageBase64 ? [imageBase64] : newRecipe.images,
    };

    await fetch(url, {
      method,
      headers: {
        Authorization: `Token ${JSON.parse(token)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });

    await fetchRecipes(); // Refresh the recipe list
    navigate("/recipes");
  };

  const handleCheckboxChange = (e) => {
    const ingredientId = parseInt(e.target.value);
    const updatedIngredients = e.target.checked
      ? [...newRecipe.ingredients, ingredientId]
      : newRecipe.ingredients.filter((id) => id !== ingredientId);

    setNewRecipe({ ...newRecipe, ingredients: updatedIngredients });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main className="container--form">
      <section>
        <form className="form--create" onSubmit={saveRecipe}>
          <h1 className="text-3xl">{id ? "Edit Recipe" : "Create Recipe"}</h1>
          <fieldset className="mt-4">
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              type="text"
              onChange={(e) => {
                setNewRecipe({ ...newRecipe, description: e.target.value });
              }}
              value={newRecipe.description}
              className="form-control"
              required
            />
          </fieldset>
          <fieldset className="mt-4">
            <label>Ingredients:</label>
            <div className="flex flex-col">
              {ingredients.map((ingredient) => (
                <label key={`ingredient-${ingredient.id}`} className="mt-2">
                  <input
                    type="checkbox"
                    value={ingredient.id}
                    onChange={handleCheckboxChange}
                    checked={newRecipe.ingredients.includes(ingredient.id)}
                  />
                  {ingredient.name}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-4">
            <label htmlFor="image">Upload Image:</label>
            <input
              id="image"
              type="file"
              onChange={createImageString}
              className="form-control"
            />
          </fieldset>
          <fieldset>
            <button
              type="submit"
              className="button rounded-md bg-green-700 text-white p-3 mt-4"
            >
              {id ? "Update Recipe" : "Add Recipe"}
            </button>
          </fieldset>
        </form>
      </section>
    </main>
  );
};
