import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  filterRecipesbyDiets,
  orderByName,
  orderByScore,
  orderByLike,
  filterRecipesbyDishTypes,
} from "../../actions";

import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/NavBar";
import "./Home.css";


export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const recetas = useSelector((state) => state.allRecipes);
  const notFound = useSelector((state) => state.error);



  const [currentPage, setCurrentPage] = useState(1); //estado local para la pag actual
  const [recipesPerPage /*setrecipesPerPage*/] = useState(9); //estado para guardar la cantidad de rec x page
  const indexOfLastRecipe = currentPage * recipesPerPage; //9
  const indexOfFirtsRecipe = indexOfLastRecipe - recipesPerPage; //0
  const currentRecipe = allRecipes.slice(indexOfFirtsRecipe, indexOfLastRecipe);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber); //cambia mi numero de pagina
  };

  const [, /*orden*/ setOrden] = useState("");
  //lo uso solo para modificar y render

  //nos traemos las recetas del estado cuando se monta
  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);


  function handleFilterRecipes(e) {
    dispatch(filterRecipesbyDiets(e.target.value));
    setCurrentPage(1);
  }
  function handleFiltersRecipes(e) {
    dispatch(filterRecipesbyDishTypes(e.target.value));
    setCurrentPage(1);
  }
  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  function handleOrderByScore(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }
  function handleOrderByLike(e) {
    e.preventDefault();
    dispatch(orderByLike(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value)
  }



  return (
    <><div className="home">
      <NavBar />
      <div>
        <div className="filtros">
          <select
            className="filtro1"
            defaultValue="sortByName"
            onChange={(e) => handleOrderByName(e)}
          >
            <option value="sortByName" select disabled>
              Sort By Name
            </option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <select
            className="filtro2"
            defaultValue="sortByScore"
            onChange={(e) => handleOrderByScore(e)}
          >
            <option value="sortByScore" select disabled>
              Sort By Score
            </option>
            <option value="high">Highest score</option>
            <option value="low">Lowest score</option>
          </select>

          <select
            className="like"
            defaultValue="Order by Vote"
            onChange={(e) => handleOrderByLike(e)}
          >
            <option value="sortByLike" select disabled>
              Order by Vote </option>
            <option value="high">Most voted</option>
            <option value="low">Least voted</option>
          </select>

          <select
            className="filtro3"
            defaultValue="all"
            onChange={(e) => handleFilterRecipes(e)}
          >
            <option value="all">Diet</option>
            <option value="dairy free">Dairy free</option>
            <option value="gluten free">Gluten free</option>
            <option value="lacto ovo vegetarian">Lacto-ovovegetarian</option>
            <option value="fodmap friendly">Low fodmap</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="paleolithic">paleolithic</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="primal">Primal</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="whole 30">Whole30</option>
          </select>

        </div>
        <div>
          <select
            className="Filtro4"
            defaultValue="all"
            onChange={(e) => handleFiltersRecipes(e)}>
            <option value="all">DishTypes</option>
            <option value="lunch">Lunch</option>
            <option value="main course">Main course</option>
            <option value="main dish">Main dish</option>
            <option value="dinner">Dinner</option>
            <option value="soup">Soup</option>
            <option value="salad">Salad</option>
            <option value="side dish">Side dish</option>
            <option value="morning meal">Morning meal</option>
            <option value="brunch">Brunch</option>
            <option value="breakfast">Breakfast</option>
            <option value="condiment">Condiment</option>
            <option value="dip">Dip</option>
            <option value="sauce">Sauce</option>
            <option value="spread">Spread</option>
          </select>
        </div>
      </div>
    </div><div className="paginado">
        <Paginado
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />
      </div>
      <div>
        {recetas.length === 0 ? (
          <div>
            <p id="not_found2"> </p>
            <img
              alt="loading"
              src=" https://media3.giphy.com/media/M2kCXo31seejZyuCMZ/giphy.gif?cid=ecf05e4742klc07rcztt5vy9faupcpbozevdfpwwhgei3si0&rid=giphy.gif&ct=s"
              id="img" />
          </div>
        ) : notFound.length === 0 && allRecipes.length > 0 ? (
          <div className="card_container">
            {currentRecipe?.map((e) => {
              return (
                <Fragment>
                  <Card
                    title={e.title}
                    image={e.image}
                    diets={e.diets.join(", ")}
                    id={e.id}
                    key={e.id} />
                </Fragment>
              );
            })}
          </div>
        ) : (
          <p id="not_found">Not recipe found</p>
        )}
      </div></>


  );
}
