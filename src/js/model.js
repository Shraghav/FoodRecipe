export const state = {
    recipe: {}
}

export const loadRecipe = async function (id) {
    try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`${data.message}`)
        }
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
        console.log(error);
    }
    
}
