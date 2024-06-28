import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipeService } from "src/app/Services/recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
    selector: 'app-RecipeDetail',
    templateUrl: './recipeDetail.component.html',
    styleUrls:['./recipeDetail.component.css']
})

export class RecipeDetailComponent implements OnInit{
    recipe:Recipe;
    desc:string[];
    id:number;

    constructor(private recipeService:RecipeService,
        private route:ActivatedRoute, private router:Router){}

    ngOnInit() {
        this.route.params.subscribe(
            (params:Params)=>{
                this.id = +params.id;
                this.recipe = this.recipeService.getRecipe(this.id);
                this.desc=this.recipe.description.split('\n')
            }
        );
    }

    onAddToShoppingList(){
        this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }

    onDeleteRecipe(){
        this.recipeService.deleteRecipe(this.id);
        this.router.navigate(['../'],{relativeTo:this.route})
    }
}