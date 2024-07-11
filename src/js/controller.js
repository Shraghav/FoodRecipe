import 'core-js/stable'
import 'regenerator-runtime'
const recipeContainer = document.querySelector('.recipe');

import * as model from './model.js'
import recipieView from './views/recipieView.js';
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
    recipieView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
  }
}

const init = function () {
  recipieView.addHandlerRender(controlRecipe);
}
init();