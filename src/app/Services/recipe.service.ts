import { Injectable } from "@angular/core";
import { Recipe } from "../Components/Recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shoppingList.service";
import { Subject } from "rxjs";


@Injectable()
export class RecipeService{
    recipeSelected = new Subject<Recipe>();
    recipeChange = new Subject<Recipe[]>();

    private recipes:Recipe[] = [];

    constructor(private shoppingListService:ShoppingListService){}

    setRecipes(recipes:Recipe[]){
        this.recipes = recipes;
        this.recipeChange.next(this.recipes.slice())
    }

    clearRecipes(){
        this.recipes = [];
        this.recipeChange.next(this.recipes.slice())
    }


    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index:number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipeChange.next(this.recipes.slice());
    }

    updateRecipe(index:number, newRecipe:Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChange.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeChange.next(this.recipes.slice());
    }
    
}