import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";

function App() {
  // /**
  //  * Determina si el checkbox debería estar checkeado basado en
  //  * el contenido del localStorage
  //  */

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/recipe" component={CreateRecipe} />
        <Route path="/recipes/:id" component={RecipeDetails} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
