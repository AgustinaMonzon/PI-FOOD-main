import React from "react";
import "./Paginado.css";

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {//math.ceil redondea pa arriba
    pageNumber.push(i);
  }
  return (
    <nav>
      {/* <div className='flechas-container'>
        {
          recipesPerPage > 1 ? <button className='flechas' onClick={() => paginado(recipesPerPage - 1)}> ❮ </button> :
            <button className='flechas' disabled> ❮ </button>
        }
        {
          recipesPerPage < pageNumber.length ? <button className='flechas' onClick={() => paginado(recipesPerPage + 1)}> ❯ </button> :
            <button className='flechas' disabled> ❯ </button>
        }
      </div> */}
      <div className="paginado">
        {pageNumber &&
          pageNumber.map((number) => (
            <button
              className="number"
              key={number}
              onClick={() => paginado(number)}
            >
              {number}
            </button>
          ))}
      </div>
    </nav>
  );
}
