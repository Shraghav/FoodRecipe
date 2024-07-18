import { API_URL,RESULTS_PER_PAGE } from './config'
import { getJson } from './helpers';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: RESULTS_PER_PAGE,
        page: 1
    }
}

export const loadRecipe = async function (id) {
    try {
        const data = await getJson(`${API_URL}/${id}`);
        const { recipe } = data.data;
        console.log(recipe);
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

export const loadSearchResult = async (query) => {
    try {
        state.search.query = query;
        const data = await getJson(`${API_URL}?search=${query}`)
        state.search.results=data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            }
        })
    } catch (error) {
        throw error;
    }
}

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;
    const start = (page-1)*state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.results.slice(start,end);
}

export const updateServings = (newServings) => {
    
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    })
    state.recipe.servings = newServings;
}