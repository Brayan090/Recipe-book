import { Component, OnDestroy, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipeService } from "src/app/Services/recipe.service";
import { Subscription } from "rxjs";


@Component({
    selector: 'app-RecipeList',
    templateUrl: './recipeList.component.html',
    styleUrls: ['./recipeList.component.css']
})

export class RecipeListComponent implements OnInit, OnDestroy{
    recipes:Recipe[];
    suscription:Subscription;

    constructor(private recipe:RecipeService){}

    ngOnInit(){
        this.suscription=this.recipe.recipeChange.subscribe(
            (recipes:Recipe[]) => {
                this.recipes = recipes;
            }
        );
        this.recipes = this.recipe.getRecipes()
    }

    ngOnDestroy() {
        this.suscription.unsubscribe();
    }
}