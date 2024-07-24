import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import Home from "../pages/Home";
import { Register } from "../pages/Register.jsx";
import { Login } from "../pages/Login.jsx";
import { RecipeList } from "./RecipeList.jsx";

export const ApplicationViews = () => {
  const [recipesState, setRecipesState] = useState([
    {
      id: 1,
      description: "Sample",
      is_owner: true,
      ingredients: [{ id: 3, name: "Test" }],
    },
  ]);

  useEffect(() => {
    fetchRecipesFromAPI();
  }, []);

  const fetchRecipesFromAPI = async () => {
    let url = "http://localhost:8000/recipes";
    let token = localStorage.getItem("recipe_token");
    console.log(JSON.parse(token))
    console.log(token);

    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${JSON.parse(token)}`,
      },
    });
    const recipes = await response.json();
    setRecipesState(recipes);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/recipes"
            element={
              <RecipeList
                recipes={recipesState}
                fetchRecipes={fetchRecipesFromAPI}
                showAll={true}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
