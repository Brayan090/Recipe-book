import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../Services/recipe.service';
import { Recipe } from '../Components/Recipes/recipe.model';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../Components/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private baseUrl = 'https://recipe-book-4ef05-default-rtdb.firebaseio.com/';

constructor(private http:HttpClient, 
            private recipeService:RecipeService,
            private authService:AuthService
          ) { }

storeRecipes() {
  const recipes = this.recipeService.getRecipes();
  return this.authService.user.pipe(
    take(1),
    switchMap(user => {
      const userId = user.id;
      return this.http.put(`${this.baseUrl}users/${userId}/recipes.json`, recipes);
    })
  ).subscribe(response => {
    console.log(response);
  });
}

fetchRecipes() {
  return this.authService.user.pipe(
    take(1),
    switchMap(user => {
      const userId = user.id;
      return this.http.get<Recipe[]>(`${this.baseUrl}users/${userId}/recipes.json`).pipe(
        map(recipes=>{
          if(recipes){
            return recipes.map(recipe=>{
              return {...recipe,ingredients:recipe.ingredients ? recipe.ingredients:[]}
            })
          }
          return null;
          
        }),tap(recipes=>{
          if (recipes) {
            this.recipeService.setRecipes(recipes);
          }else{
            alert('No se encontraron recetas!')
          }
          
        })
      );
    })
  );
}

}
