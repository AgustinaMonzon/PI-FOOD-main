const { Router } = require("express");
const { Diet, Recipe, DishType } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  try {
    let {
      title,
      summary,
      spoonacularScore,
      healthScore,
      steps,
      diets,
      image,
      dishTypes,
    } = req.body;

    let recipeCreated = await Recipe.create({
      title,
      summary,
      spoonacularScore,
      healthScore,
      steps,
      image,
    });
    //console.log("DIETSS", diets);

    diets.forEach(async (e) => {
      let dietDb = await Diet.findAll({
        where: { title: e },
      });
      if (!title)
        return res
          .status(400)
          .send({ error: "Debe ingresar el título para la receta" });
      if (!summary)
        return res
          .status(400)
          .send({ error: "Debe ingresar un summary del receta" });
      await recipeCreated.addDiets(dietDb);
      //console.log("acaaaaa", dietDb);
    });
    dishTypes.forEach(async (e) => {
      let dishTypeDb = await DishType.findAll({
        where: { title: e },
      });
      await recipeCreated.addDishTypes(dishTypeDb);
      //console.log("acaaaaa", dietDb);
    });

    res.json("Receta creada", recipeCreated);
  } catch (error) {
    console.log("ERROR,", error);
  }
});
module.exports = router;
