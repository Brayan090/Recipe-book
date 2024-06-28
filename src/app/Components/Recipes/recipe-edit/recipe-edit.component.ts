import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/Services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
  id:number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(private route:ActivatedRoute, private recipeSer:RecipeService, private router:Router){}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params.id;
        this.editMode = params.id !== undefined;

        this.initForm();
      }
    );
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let description = '';
    let ingredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeSer.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      description = recipe.description;
      
      if (recipe['ingredients']) {
        recipe.ingredients.forEach(ingredient =>{
          ingredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        })
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath,Validators.required),
      'description': new FormControl(description,Validators.required),
      'ingredients': ingredients
    })

  }

  get Controls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }


  onSubmit(){
    //const recipe = new Recipe(this.recipeForm.value['name'],
    //                          this.recipeForm.value['description'],
    //                          this.recipeForm.value['imagePath'],
    //                          this.recipeForm.value['ingredients'])

    if (this.editMode) {
      this.recipeSer.updateRecipe(this.id,this.recipeForm.value);
    }else{
      this.recipeSer.addRecipe(this.recipeForm.value);
    }
    this.onCancel()
  }

  onAddIngredient(){
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      'name': new FormControl(null,Validators.required),
      'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  onDeleteIngredient(index:number){
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
    //(this.recipeForm.get('ingredients') as FormArray).clear(); Borra todo el registro
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

}
