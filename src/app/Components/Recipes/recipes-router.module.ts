import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./RecipeDetail/recipeDetail.component";
import { RecipeResolverService } from "./recipe-resolver.service";
import { AuthGuard } from "../auth/auth.guard";

const routes:Routes = [
    {path:'',component:RecipesComponent, canActivate:[AuthGuard],children:[
        {path:'',component:RecipeStartComponent},
        {path:'new',component:RecipeEditComponent},
        {path:':id',component:RecipeDetailComponent,resolve:[RecipeResolverService]},
        {path:':id/edit',component:RecipeEditComponent,resolve:[RecipeResolverService]},
    ]},
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class RecipesRouterModule{}