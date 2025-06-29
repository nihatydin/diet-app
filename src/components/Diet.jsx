import React, {useEffect, useState} from "react";
import axios from "axios";

const GlutenFreeRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(""); // arama sorgusu
  const [searchTerm, setSearchTerm] = useState(""); // inputtaki değer

  const API_KEY = "c52fca7e3dbd4a29a666992e9140c8bc";

  const fetchRecipes = async (searchQuery = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            apiKey: API_KEY,
            diet: "gluten free",
            number: 9,
            query: searchQuery, // arama yapılacak kelime
          },
        }
      );
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Tarifler alınamadı:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipeDetails = async (id) => {
    try {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information`,
        {
          params: {
            apiKey: API_KEY,
            includeNutrition: true,
          },
        }
      );
      setSelectedRecipe(res.data);
    } catch (error) {
      console.error("Detay alınamadı:", error);
    }
  };

  useEffect(() => {
    fetchRecipes("Cake"); // ilk açılışta tarifleri getir
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSelectedRecipe(null); // arama yaparken detaydan çık
    fetchRecipes(searchTerm);
    setQuery(searchTerm);
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="px-4 pb-4 pt-2">
      {/* 🔍 Arama Çubuğu */}
      <form onSubmit={handleSearch} className="flex justify-center mb-6 gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search a recipe (pizza, cake...)"
          className="border rounded px-4 py-2 w-full max-w-md"
        />
        <button
          type="submit"
          className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* 🔍 Arama başlığı */}
      {query && !selectedRecipe && (
        <p className="text-center text-gray-600 mb-4">Results for “{query}”:</p>
      )}

      {/* 📋 Tarif Detayı */}
      {selectedRecipe ? (
        <div className="border rounded-xl p-4 mb-4 bg-white shadow-lg  w-full mx-auto">
          <button
            onClick={() => setSelectedRecipe(null)}
            className="bg-green-700 text-white rounded py-1 px-2 mb-2"
          >
            ← Back
          </button>
          <h3 className="text-2xl font-bold mb-2 capitalize">
            {selectedRecipe.title}
          </h3>
          <img
            src={selectedRecipe.image}
            alt={selectedRecipe.title}
            className="w-full h-60 object-cover rounded"
          />
          <p
            className="mt-4 text-justify"
            dangerouslySetInnerHTML={{__html: selectedRecipe.summary}}
          />
          <h4 className="font-semibold mt-4 mb-1">Ingredients:</h4>
          <ul className="list-disc list-inside">
            {selectedRecipe.extendedIngredients.map((item) => (
              <li key={item.id}>{item.original}</li>
            ))}
          </ul>
          <h4 className="font-semibold mt-4 mb-1">Nutritional Values:</h4>
          <ul className="list-disc list-inside">
            {selectedRecipe.nutrition?.nutrients
              ?.slice(0, 6)
              .map((nutrient) => (
                <li key={nutrient.name}>
                  {nutrient.name}: {nutrient.amount} {nutrient.unit}
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No avaliable recipe.
            </p>
          ) : (
            recipes.map((recipe, i) => (
              <div
                key={i}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-2 text-lg capitalize font-semibold">
                  {recipe.title}
                </h3>
                <button
                  onClick={() => fetchRecipeDetails(recipe.id)}
                  className="mt-2 w-full text-white bg-green-500 p-2 rounded cursor-pointer"
                >
                  See Details
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default GlutenFreeRecipes;
