import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { RecipeDetailComponent } from "./RecipeDetail/recipeDetail.component";
import { RecipeItemComponent } from "./RecipeList/RecipeItem/recipeItem.component";
import { RecipeListComponent } from "./RecipeList/recipeList.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipesRouterModule } from "./recipes-router.module";
import { SharedModule } from "../../shared/shared.module";
import { TruncatePipe } from "src/app/shared/truncate.pipe";

@NgModule({
    declarations:[
        RecipesComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeListComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        TruncatePipe
    ],
    imports:[
        SharedModule,
        RouterModule,
        ReactiveFormsModule,
        RecipesRouterModule

    ],
    providers:[

    ],
    exports:[]
})

export class RecipeModule{}