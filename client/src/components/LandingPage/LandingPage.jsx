import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
// import videocomida from "./videocomida.mp4";

//COMPONENTE FUNCIONAL
export default function LandingPage() {
  return (
    <div className="landing">
      <div className="contiene">
        <div>
          <h1 className="landing_h1">Bienvenidos</h1>
        </div>
        <div>
          <div className="landing_h2">
            <h2>¿Están listos para tentarse?</h2>
          </div>
        </div>
        <Link to="/home">
          <button className="landing_button">¡Entrar!</button>
        </Link>
      </div>
      {/* <video muted autoPlay loop>
        <source src={videocomida} type="video/mp4" />
      </video>
      <div className="capa"></div> */}
    </div>
  );
}
