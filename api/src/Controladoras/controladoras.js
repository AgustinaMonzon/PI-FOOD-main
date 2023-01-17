const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { API_Key } = process.env;

const getApiInfo = async () => {
  try {
    const apiUrl = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_Key}&addRecipeInformation=true&number=100`
    );
    const apiData = apiUrl.data?.results.map((e) => {
      return {
        title: e.title,
        id: e.id,
        summary: e.summary,
        steps: e.analyzedInstructions[0]?.steps.map((e) => e.step),
        spoonacularScore: e.spoonacularScore,
        healthScore: e.healthScore,
        diets: e.diets,
        image: e.image,
        dishTypes: e.dishTypes,
        ingredients: e.analyzedInstructions[0]?.steps.map((e) =>
          e.ingredients.map((el) => el.name)
        ),

        aggregateLikes: e.aggregateLikes,
        readyInMinutes: e.readyInMinutes,
      };
    });
    return apiData;
  } catch (error) {
    console.log(error);
  }
};

const getDbInfo = async () => {
  let dbRecipes = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["title"],
      through: {
        attributes: [],
      },
    },
  });

  return dbRecipes.map((e) => {
    return {
      title: e.title,
      id: e.id,
      summary: e.summary,
      steps: e.steps,
      spoonacularScore: e.spoonacularScore,
      healthScore: e.healthScore,
      diets: e.diets.map((e) => e.title),
      image: e.image,
      createdInDb: e.createdInDb,
    };
  });
};

const getAllRecipes = async () => {
  const apiData = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiData.concat(dbInfo);
  return infoTotal;
};

module.exports = {
  getAllRecipes,
  getApiInfo,
};
