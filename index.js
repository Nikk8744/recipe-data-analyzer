require('dotenv').config();
const axios = require("axios");
const collect = require("collect.js");

const API_URL = "https://api.spoonacular.com/recipes/complexSearch";

async function fetchRecipes(){
    try {
        const response = await axios.get(API_URL, {
            params: {
                "apiKey": process.env.API_KEY,
                "number": 10,
                "addRecipeInformation": true
            }
        });
        // console.log(response)
        return response.data.results;
    } catch (error) {
        console.log(error)
    }
}

async function analyzeRecipesData(recipes){
    // have to use collect.js to do data analysis
    const RecipesCollection = collect(recipes); 
    // console.log("The collection is: ")
    // console.log(RecipesCollection);

    // average time
    const time = RecipesCollection.pluck('readyInMinutes')
    const averageCookingTime = time.avg();
    console.log("\nThe avg time is:",averageCookingTime)
    
    // highest rating
    const highestRated = RecipesCollection.sortBy('spoonacularScore').last();
    console.log("\nThe highest rated Recipe is:", highestRated.title)
    
    // group by cuisine
    const groupedByCuisines = RecipesCollection.groupBy('cuisines') // this will return a collection of cusines and ispe foreach nhi chalta
    // console.log(groupedByCuisines)
    groupedByCuisines.each((recipes, cuisine) => {
        console.log(`\n ${cuisine  || "Unknown Cuisine"} :`)
        recipes.each(recipe => {
            console.log(`${recipe.title}`)
        })
    });
}

// method - 1
 async function result(){

    console.log("Fetching Recepies")
    const recipes = await fetchRecipes();
    if (recipes.length === 0) {
        console.log("No recipes found")
    }
    console.log("The second recipe is:", recipes[0].title)
    // console.log(recipes)

    const data = await analyzeRecipesData(recipes)
    
}

//  another method - 2
//  fetchRecipes().then(recipes => console.log(recipes))
// .catch(error => console.error(error));

 result();