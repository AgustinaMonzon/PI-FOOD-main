const initialState = {
  recipes: [],
  allRecipes: [], //CREADA PARA LAS DIETAS --> ALL
  diets: [],
  detail: [],
  error: "",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
        error: "",
        detail: [],
      };

    case "GET_RECIPES_BY_NAME":
      return {
        ...state,
        recipes: action.payload,
        error: "",
      };
    case "FILTER_BY_DIETS":
      const allRecipes = state.allRecipes;
      const statusFiltered =
        action.payload === "all"
          ? allRecipes
          : allRecipes.filter((e) =>
              e.diets.find((e) => e.includes(action.payload))
            );
      return {
        ...state,
        recipes: statusFiltered,
      };

    case "FILTER_BY_DISHTYPES":
      const allRecipes1 = state.allRecipes;
      const statusFil =
        action.paylod === "all"
          ? allRecipes1
          : allRecipes1.filter((e) =>
              e.dishTypes.find((e) => e.includes(action.payload))
            );
      return {
        ...state,
        recipes: statusFil,
      };

    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };

    case "POST_RECIPE":
      return {
        ...state,
      };
    case "ORDER_BY_NAME":
      let sorteredArr =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.title > b.title) {
                return 1;
              }
              if (b.title > a.title) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.title > b.title) {
                return -1;
              }
              if (b.title > a.title) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: sorteredArr,
      };

    case "ORDER_BY_SCORE":
      let sorteredByScore =
        action.payload === "high"
          ? state.recipes.sort(function (a, b) {
              // return sorteredByScore.sort((a,b)=>{
              return b.healthScore - a.healthScore;
            })
          : state.recipes.sort(function (a, b) {
              // return sorteredByScore.sort((a,b)=>{
              return a.healthScore - b.healthScore;
            });
      return {
        ...state,
        recipes: sorteredByScore,
      };

    case "ORDER_BY_LIKE":
      let sorteredByLike =
        action.payload === "high"
          ? state.recipes.sort(function (a, b) {
              return b.aggregateLikes - a.aggregateLikes;
            })
          : state.recipes.sort(function (a, b) {
              return a.aggregateLikes - b.aggregateLikes;
            });
      return {
        ...state,
        recipes: sorteredByLike,
      };
    case "GET_DETAILS":
      console.log("actionn", action.payload);
      return {
        ...state,
        detail: action.payload,
      };
    case "REMOVE_DETAILS":
      return {
        ...state,
        detail: [],
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "REMOVE_RECIPE":
      return {
        ...state,
        allRecipes: [],
        recipes: [],
      };

    default:
      return state; //InitialState
  }
}

export default rootReducer;
