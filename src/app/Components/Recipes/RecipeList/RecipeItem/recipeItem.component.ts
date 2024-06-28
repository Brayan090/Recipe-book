import { Component, Input } from "@angular/core";
import { Recipe } from "../../recipe.model";


@Component({
    selector: 'app-RecipeItem',
    templateUrl: './recipeItem.component.html',
    styleUrls: ['./recipeItem.component.css']
})
export class RecipeItemComponent{
    @Input() recipe:Recipe;
    @Input() index:number;
    
}