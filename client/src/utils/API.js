// First search fetches ID
export const searchIngredients = (query) => {
    return fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=5d21fcc224ed4f1caff20062b5740f70&ingredients=${ingredients}}`);
  };
  



// ingredients generated by drag and drop
// OR
// query?


// searches full recipe by ID
export const searchRecipeById = (recipeId) => {
    return fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=5d21fcc224ed4f1caff20062b5740f70&includeNutrition=false`);
  };