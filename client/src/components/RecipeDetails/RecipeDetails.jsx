import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, removeDetail, removeRecipe } from "../../actions";
import { useEffect } from "react";
import "./RecipeDetails.css";

export default function Details(props) {
  console.log("PROPIEDADES", props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
    dispatch(removeRecipe());
    //DESMONTA
    return () => {
      dispatch(removeDetail());
    };
  }, [dispatch, props.match.params.id]);

  const myRecipe = useSelector((state) => state.detail);
  // console.log("Recetaa", myRecipe)
  return (
    <div style={{ overflow: "hidden" }}>
      {myRecipe.length === 0 ? (
        <div>
          <p id="not_found2">Loading...</p>
          <img
            alt="loading"
            src=" https://media3.giphy.com/media/M2kCXo31seejZyuCMZ/giphy.gif?cid=ecf05e4742klc07rcztt5vy9faupcpbozevdfpwwhgei3si0&rid=giphy.gif&ct=s"
            id="img"
          />
        </div>
      ) : (
        <div className="recipeContainer">
          <div className="recipeContainer2">
            <h1>{myRecipe[0].title}</h1>
            <img
              src={myRecipe[0].image}
              width="300px"
              height="220px"
              alt="img not found"
            />
            {/* <h2>Score: {myRecipe[0].spoonacularScore}</h2> */}
            <h3 className="Preparation">Preparation time:</h3>
            <h2 className="Textito"> {myRecipe[0].readyInMinutes} minutes</h2>
            <h3 className="Preparation">Healthy Food Level: </h3>
            <h2 className="Textito">{myRecipe[0].healthScore}</h2>
            <h3 className="Preparation"> Like: </h3>
            <h2 className="Textito">{myRecipe[0].aggregateLikes}</h2>
            <h3 className="Preparation">Diets: </h3>
            <h2 className="Textito">{myRecipe[0].diets}</h2>
            <h3 className="Preparation">Dish Type:</h3>
            <h2 className="Textito"> {myRecipe[0].dishTypes}</h2>
            {/* CUALQUIER cooooosa*/}




          </div>
          <div className="recipeDetail_text1">
            <p id="Recipe">RECIPE</p>
            <p id="ingredients">Ingredients: </p>
            <p className="body">{myRecipe[0].ingredients}</p>
            <p id="title">Summary: </p>
            <p className="body">{myRecipe[0].summary}</p>
            <p id="title2">Instructions: </p>
            <p id="body2">{myRecipe[0].steps}</p>

            {/* <p id="score">Score: </p> */}
          </div>
          <Link to="/home">
            <button id="buttonReturn">Return</button>
          </Link>
        </div>
      )}
    </div>
  );
}
