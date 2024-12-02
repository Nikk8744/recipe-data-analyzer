const axios = require("axios");
const collect = require("collect.js");
require('dotenv').config();

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
        return response.data.results;
    } catch (error) {
        console.log(error)
    }
}

async function analyzeRecipesData(){
    // have to use collect.js to do data analysis
}

// method - 1
 async function displayRecipes(){
    const recipes = await fetchRecipes();
    console.log(recipes[1].title)
    console.log(recipes)
 }

//  another method - 2
 fetchRecipes().then(recipes => console.log(recipes))
.catch(error => console.error(error));

 displayRecipes();