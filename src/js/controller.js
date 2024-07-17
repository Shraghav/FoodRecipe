import 'core-js/stable'
import 'regenerator-runtime'
const recipeContainer = document.querySelector('.recipe');

import * as model from './model.js'
import recipieView from './views/recipieView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipieView.renderSpinner(recipeContainer);
    //1) Loading recipe
    await model.loadRecipe(id);
    //2) rendering recipe
    console.log(model.state.recipe);
    recipieView.render(model.state.recipe);
  }
  catch (error) {
    console.log(`Oops....${error}`);
    recipieView.renderError(error)
  }
}

const controlSearchResults = async () => {
  try {
    // resultsView.renderSpinner();
    //1) get search
    const query = searchView.getQuery();
    if (!query) return;

    //2) load result
    await model.loadSearchResult(query);

    //3) render resut
    // console.log(model.state.search.results);
    resultsView.render(model.state.search.results)

  } catch (error) {
    console.log(error);
  }
}


const init = function () {
  recipieView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
}
init();