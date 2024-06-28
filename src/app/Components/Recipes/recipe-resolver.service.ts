import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStoreService } from 'src/app/shared/data-store.service';
import { Observable } from 'rxjs';
import { RecipeService } from 'src/app/Services/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{

constructor(private dataStorage:DataStoreService,private recipeService:RecipeService) { }

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
  const recipes = this.recipeService.getRecipes();
  if (recipes.length === 0) {
    return this.dataStorage.fetchRecipes()
  }else{
    return recipes;
  }
  
}

}
