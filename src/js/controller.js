import 'core-js/stable'
import 'regenerator-runtime'
const recipeContainer = document.querySelector('.recipe');

import * as model from './model.js'
import recipieView from './views/recipieView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import PaginationView from './views/paginationView.js';
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

    //0) update results (mark selected serach)
    resultsView.update(model.getSearchResultsPage())

    //1) Loading recipe
    await model.loadRecipe(id);

    //2) rendering recipe
    recipieView.render(model.state.recipe);
  }
  catch (error) {
    console.log(`Oops....${error}`);
    recipieView.renderError(error)
  }
}
//search results
const controlSearchResults = async () => {
  try {
    // resultsView.renderSpinner();
    //1) get search
    const query = searchView.getQuery();
    if (!query) return;

    //2) load result
    await model.loadSearchResult(query);

    //3) render resut
    resultsView.render(model.getSearchResultsPage(1));

    //4) Initial pagination
    PaginationView.render(model.state.search)

  } catch (error) {
    console.log(error);
  }
}

const controlPagination = function (gotoPage) {
  //render new results
  resultsView.render(model.getSearchResultsPage(gotoPage));
  
  // //rennder new pagination buttons
  PaginationView.render(model.state.search)
}

const controlServings = (newServings) => {
  //update recipe servings (in state)
  model.updateServings(newServings);
 
  // update recipeView
  recipieView.update(model.state.recipe)
}
const init = function () {
  recipieView.addHandlerRender(controlRecipe);
  recipieView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
}
init();