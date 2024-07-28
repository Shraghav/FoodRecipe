import { API_URL,KEY,RESULTS_PER_PAGE } from './config'
import { getJson,setJSON } from './helpers';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: RESULTS_PER_PAGE,
        page: 1
    },
    bookmarks: []
}

const createRecipeObj = (data) => {
    const { recipe } = data.data;
    return {
        id: recipe.id,
        title: recipe.title,
        cookingTime: recipe.cooking_time,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        ingredients: recipe.ingredients,
        ...(recipe.key && {key: recipe.key})
    };
}

export const loadRecipe = async function (id) {
    try {
        const data = await getJson(`${API_URL}/${id}?key=${KEY}`);
        // console.log(recipe);
        state.recipe = createRecipeObj(data);
        if (state.bookmarks.some(bookmark => bookmark.id === id)) {
            state.recipe.bookmarked = true;
        }
        else {
            state.recipe.bookmarked = false;
        }
        // console.log(state.recipe);
    } catch (error) {
        throw error;
    }
}

export const loadSearchResult = async (query) => {
    try {
        state.search.query = query;
        const data = await getJson(`${API_URL}?search=${query}&key=${KEY}`)
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
                ...(rec.key && { key: rec.key })
            }
        });
        state.search.page = 1;
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

export const addBookmark = (recipe) => {
    //add bookmark
    state.bookmarks.push(recipe)
    
    //mark current recipe as bookmark
    if (recipe.id == state.recipe.id) {
        state.recipe.bookmarked = true;
    }
    persistBookmark();
}

export const deleteBookmark = (id) => {

    //delete bookmark
    const index = state.bookmarks.findIndex(el => el.id === id)
    state.bookmarks.splice(index, 1);

    //mark current recipe as not a bookmark
    if (id == state.recipe.id) {
        state.recipe.bookmarked = false;
    }
    persistBookmark();
}

const persistBookmark = () => {
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks))
}

const init = () => {
    const storage = localStorage.getItem('bookmarks');
    if(storage)  state.bookmarks = JSON.parse(storage)
}
init();

const clearBookmarks = function () {
    localStorage.clear('bookmarks')
}
// clearBookmarks()

// export const uploadRecipe = async (newRecipe) => {
//     // console.log(Object.entries(newRecipe));
//     try {
//         const ingredients = Object.entries(newRecipe).filter(entry =>
//             entry[0].startsWith('ingredient') && entry[1] != ''
//         ).map(ing => {
//             const ingArray = ing[1].split(',').map(el => el.trim());
//             if (ingArray.length != 3) {
//                 throw new Error('Wrong ingredient! Please use correct format as mentioned')
//             }
//             const [quantity, unit, description] = ingArray
//             return { quantity: quantity ? +quantity : null, unit, description };
//         })
//         // console.log(ingredients);
//         //will be uploaded 
//         const recipe = {
//             //sourceURL: recipe.source_url,
//             title: newRecipe.title,
//             source_url: newRecipe.sourceUrl,
//             image_url: newRecipe.image,
//             publisher: newRecipe.publisher,
//             cooking_time: +newRecipe.cookingTime,
//             servings: +newRecipe.servings,
//             ingredients
//         }
//         const data = await setJSON(`${API_URL}?key=${KEY}`, recipe);
//         state.recipe = createRecipeObj(data);
//         addBookmark(state.recipe)
//     }
//     catch (err) {
//         throw err;
//     }
// }
//key : 241a33d1-e499-4868-8ce0-fa6f3d72b827