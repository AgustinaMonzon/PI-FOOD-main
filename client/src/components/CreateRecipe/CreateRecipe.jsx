import { useState, useEffect } from "react";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getDiets } from "../../actions";
import "./CreateRecipe.css";

//---------- VALIDACIONES -----------

function validate(input) {
  let errors = {};

  if (!/^[a-zA-Z\s]*$/.test(input.title))
    errors.title = "Nombre inválido, inserte solo letras";
  if (!input.title) {
    errors.title = "Por favor, inserte un nombre para crear la receta";
  }
  if (!input.summary) {
    errors.summary = "Por favor, inserte un resumen para crear la receta";
  }
  if (input.spoonacularScore < 0 || input.spoonacularScore > 100) {
    errors.spoonacularScore = "Por favor, inserte un número de 1 al 100";
  }
  if (input.healthScore < 0 || input.healthScore > 100) {
    errors.healthScore = "Por favor, inserte un número de 1 al 100";
  }
  return errors;
}

//-------------------------------------

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets); //me traigo el estado de las dietas con el useSelector

  //CREO ESTADOS LOCALES PARA ALMACENAR INFORMACION
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    title: "",
    image: "",
    summary: "",
    spoonacularScore: "",
    healthScore: "",
    steps: [],
    diets: [],
  });

  //--- HANDLERS
  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheckBox(e) {
    const clicked = diets
      .filter((d) => e.target.value === d.title)
      .map((d) => d.title);
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, ...clicked],
      });
    } else {
      setInput({
        ...input,
        diets: input.diets.filter((e) => e !== clicked[0]),
      });
    }
  }

  function handleSelectStep(e) {
    setInput({
      ...input,
      steps: [e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log("RECETA EN CREACION", input);
    dispatch(postRecipe(input));
    alert("Receta creada con éxito!");
    //reseteo para que quede vacio
    setInput({
      title: "",
      image: "",
      summary: "",
      spoonacularScore: "",
      healthScore: "",
      steps: [],
      diets: [],
    });
    history.push("/home");
  }

  //EJECUTO LA ACCION CUANDO SE MONTA EL COMPONENTE
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  //renderizado
  return (
    <div className="fondo">
      <div className="formContainer">
        <h1>Create your own Recipe</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="inputs">
            <div className="arr">
              <label>Name: </label>
              <input
                type="string"
                value={input.title}
                name="title"
                onChange={(e) => handleInputChange(e)}
              />
              {errors.title && <h5>{errors.title}</h5>}
            </div>
            <div className="arr">
              <label>Image: </label>
              <input
                type="url"
                value={input.image}
                name="image"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="arr">
              <label>Score: </label>
              <input
                type="number"
                value={input.spoonacularScore}
                name="spoonacularScore"
                onChange={(e) => handleInputChange(e)}
              />
              {errors.spoonacularScore && <h5>{errors.spoonacularScore}</h5>}
            </div>
            <div className="arr">
              <label>Healthy Food Level: </label>
              <input
                type="number"
                value={input.healthScore}
                name="healthScore"
                onChange={(e) => handleInputChange(e)}
              />
              {errors.healthScore && <h5>{errors.healthScore}</h5>}
            </div>
            <div className="arr">
              <label>Summary: </label>
              <input
                className="textarea"
                type="text"
                value={input.summary}
                name="summary"
                onChange={(e) => handleInputChange(e)}
              />
              {errors.summary && <h5>{errors.summary}</h5>}
            </div>

            <div className="arr">
              <label>Steps: </label>
              <input
                className="textarea"
                type="text"
                value={input.steps}
                name="steps"
                onChange={(e) => handleSelectStep(e)}
                id="steps"
              />
            </div>
          </div>
          <div className="tipoDeDietas">
            <div>
              <label>Diets:</label>
              <div className="opciones">
                {diets.map((e) => (
                  <div className="box">
                    <input
                      className="box2"
                      type="checkbox"
                      value={e.title}
                      name={e.title}
                      onChange={(e) => handleCheckBox(e)}
                    />
                    <h3>{e.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {errors.title ||
            errors.summary ||
            errors.spoonacularScore ||
            errors.healthScore ||
            input.title === "" ? (
            <button className="createButton2" select disabled type="submit">
              Create Recipe
            </button>
          ) : (
            <button className="createButton" type="submit">
              Create Recipe
            </button>
          )}
        </form>
        <div className="Containerbutton">
          <div className="returnButton">
            <Link to="/home">
              <p>Return</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
