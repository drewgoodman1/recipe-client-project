import React, { useEffect } from "react";

export const RecipeList = ({ recipes, fetchRecipes }) => {
  useEffect(() => {});

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
