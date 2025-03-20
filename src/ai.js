export async function getRecipeFromMistral(ingredientsArr) {
    try {
        const response = await fetch("/.netlify/functions/getRecipe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredients: ingredientsArr }),
        });
        const data = await response.json();
        return data.recipe;
    } catch (err) {
        console.error("Error fetching recipe:", err.message);
    }
}
