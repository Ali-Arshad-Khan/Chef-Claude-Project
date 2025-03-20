import React from "react"
import { useState } from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"
import { getRecipeFromMistral } from "../ai"
export default function Main() {

    const [ingredients, setIngredients] = React.useState([])

    const [recipe, setRecipe] = React.useState("")
   
    function submit(formData) {
        const ingredient = formData.get("ingredient")
        // console.log(ingredient)
        // ingredients.push(ingredient)
        // console.log(ingredients)
        if (ingredient.trim()){
        setIngredients(prevState => [...prevState,ingredient])
        }
    }
    console.log(ingredients)
    
    
    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    return(
        <main>
            <form action={submit} className="add-ingredient-form">
            <input 
            type="text" 
            placeholder="e.g. Egg"
            aria-label="Add ingredient"
            name="ingredient"
            />
            <button>Add Ingredients</button>
            </form>
            {ingredients.length > 0 &&
            <IngredientsList ingredients={ingredients} getRecipe={getRecipe}/>
            }
           {recipe && <ClaudeRecipe recipe={recipe}/>}
        </main>
    )
}