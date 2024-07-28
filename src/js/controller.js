import 'core-js/stable'
import 'regenerator-runtime'
const recipeContainer = document.querySelector('.recipe');

import * as model from './model.js'
import recipieView from './views/recipieView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarkView from './views/bookmarkView.js';
import PaginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

import { MODAL_CLOSE } from './config.js';

// Documentation : https://forkify-api.herokuapp.com/v2
/**
 * @returns recipeView and resultView after getting data from model and updating bookmarks
 */
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

    //3) update bookmarks view
    bookmarkView.update(model.state.bookmarks)
  }
  catch (error) {
    console.log(`Oops....${error}`);
    recipieView.renderError()
  }
}

/**
 * @returns searched results with query specified along with pagination (specific recipe)
 */
const controlSearchResults = async () => {
  try {
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

/**
 * @param {*} gotoPage specifies page (keeps changing)
 */
const controlPagination = function (gotoPage) {
  //render new results
  resultsView.render(model.getSearchResultsPage(gotoPage));
  
  //rennder new pagination buttons
  PaginationView.render(model.state.search)
}

/**
 * @param {*} newServings servings can be updated dynamically
 * @function updateServings - will update only changed attributes from previous state
 */
const controlServings = (newServings) => {
  //update recipe servings (in state)
  model.updateServings(newServings);

  // update recipeView
  recipieView.update(model.state.recipe)
}

/**
 * @returns bookmarked recipes (just displays)
 */
const controlAddBookmark = () => {
  //1) Add or remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //2) Update recipeView
  recipieView.update(model.state.recipe);

  //3) Render bookmarks
  bookmarkView.update(model.state.bookmarks)
}

/**
 * @param {*} newRecipe coming from addRecipeView Handler
 */
// const controlAddRecipe = async(newRecipe) => {
//   try {
//     //spinner
//     addRecipeView.renderSpinner();

//     //uploading new recipe data
//     await model.uploadRecipe(newRecipe);

//     //render recipe
//     recipieView.render(model.state.recipe);

//     //success message
//     addRecipeView.renderMessage();

//     //render bookmark view
//     bookmarkView.render(model.state.bookmarks);

//     //changeId in url
//     window.history.pushState(null, '', `#${model.state.recipe.id}`);

//     //closing form
//     setTimeout(function () {
//       addRecipeView.toggleWindow()
//     },MODAL_CLOSE*1000)
//   }
//   catch (err) {
//     console.error("Error dude", err);
//     addRecipeView.renderError(err.message);
//   }
// }

const controlBookmarks = () => {
  bookmarkView.render(model.state.bookmarks)
}

const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks)
  recipieView.addHandlerRender(controlRecipe);
  recipieView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  recipieView.addHandlerBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();