const { Router } = require("express");
// Importar todos los routers;
const recipesRoute = require("./Recipes");
const typeOfDietsRoute = require("./TypeOfDiets");
const postRecipeRoute = require("./PostRecipe");
const router = Router();

// Configurar los routers
router.use("/recipe", postRecipeRoute);
router.use("/recipes", recipesRoute);
router.use("/types", typeOfDietsRoute);

module.exports = router;
