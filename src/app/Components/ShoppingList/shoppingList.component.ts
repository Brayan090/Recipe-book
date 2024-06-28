import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ShoppingListService } from "src/app/Services/shoppingList.service";
import { Ingredient } from "src/app/shared/ingredient.model";


@Component({
    selector: 'app-ShoppingList',
    templateUrl: './shoppingList.component.html',
    styleUrls: ['./shoppingList.component.css']
})

export class ShoppingListComponent implements OnInit,OnDestroy{

    ingredients:Ingredient[];
    private igChangeSub: Subscription;

    constructor(private shoppingListService:ShoppingListService){}

    ngOnInit(){
        this.ingredients = this.shoppingListService.getIngredients();
        this.igChangeSub=this.shoppingListService.ingredientsChange.subscribe(
            (ListIngredients:Ingredient[]) =>{
                this.ingredients = ListIngredients;
            }
        );
    }

    ngOnDestroy() {
        this.igChangeSub.unsubscribe()
    }

    onEditItem(index:number){
        this.shoppingListService.startEditing.next(index);
    }
}