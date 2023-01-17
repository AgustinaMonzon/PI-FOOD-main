import React from "react";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";  ¡se me rompía!
//import { getRecipes } from "../../actions";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";

export default function NavBar() {
  // const dispatch = useDispatch();

  function handleClick(e) {
    // e.preventDefault();
    // dispatch(getRecipes());}
    window.location.reload(); //me resetea
  }

  return (
    <div className="navbar">
      <div>
        <Link to="/recipe">
          <button className="navbar_boton1">Create Recipe</button>
        </Link>
      </div>
      <div>
        <button
          className="navbar_boton2"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Refresh all Recipes
        </button>
      </div>
      <div className="navbar_searchbar">
        <SearchBar />
      </div>
    </div>
  );
}
