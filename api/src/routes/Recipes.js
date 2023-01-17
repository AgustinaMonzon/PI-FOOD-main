const { Router } = require("express");
const router = Router();
const { getAllRecipes } = require("./../Controladoras/controladoras.js");

//RUTAS PARA TRAER INFORMACION DE LAS RECETAS

//RUTA PARA OBTENER LAS RECETAS POR NAME (QUERY)
router.get("/", async (req, res) => {
  try {
    const name = req.query.name;
    let totalRecipes = await getAllRecipes();
    if (name) {
      let recipesByName = await totalRecipes.filter((e) =>
        e.title.toLowerCase().includes(name.toLowerCase())
      );

      recipesByName.length
        ? res.status(200).json(recipesByName)
        : res.status(200).json([]);
    } else {
      res.status(200).json(totalRecipes);
    }
  } catch (error) {
    res.status(400).send("No está esa receta, sorry");
  }
});

// RUTA PARA OBTENER LAS RECETAS POR ID (PARAMS)
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let totalRecipes = await getAllRecipes();
    if (id) {
      let recipesById = await totalRecipes.filter((e) => e.id == id);
      recipesById.length
        ? res.status(200).json(recipesById)
        : res.status(404).send("No existe esa receta");
    } else {
      res.status(400).send("No la encontré, sorry");
      //console.log(recipesById);
    }
  } catch (error) {
    res.status(400).send("Error");
  }
});
// router.delete("/recipes/:id", async (req, res) => {
//   const { id } = req.params;
//   const recipe = await recipe.findByPk(id);
//   if (recipe) {
//     await recipe.destroy();
//     res.status(200).send(`Receta ${recipe.name} borrada`);
//   } else {
//     res.status(400).send("Receta no encontrada, sorry");
//   }
// });
module.exports = router;
