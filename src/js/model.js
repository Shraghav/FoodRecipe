export const state = {
    recipe: {}
}

import {API_URL} from './config'
import { getJson } from './helpers';
export const loadRecipe = async function (id) {
    try {
        const data = await getJson(`${API_URL}/${id}`);
        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            cookingTime: recipe.cooking_time,
            publisher: recipe.publisher,
            sourceURL: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            ingredients: recipe.ingredients,
        }
        console.log(state.recipe);
    } catch (error) {
        throw error;
    }
}
