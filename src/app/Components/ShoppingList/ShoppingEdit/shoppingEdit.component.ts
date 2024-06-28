
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { ShoppingListService } from "src/app/Services/shoppingList.service";
import { Ingredient } from "src/app/shared/ingredient.model";



@Component({
    selector: 'app-ShoppingEdit',
    templateUrl: './shoppingEdit.component.html',
    styleUrls: ['./shoppingEdit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy{

    suscription:Subscription;
    editMode:boolean = false;
    editedItemIndex:number;
    editedItem:Ingredient;

    @ViewChild('f') myForm:NgForm;

    constructor(private shoppingListService:ShoppingListService){}

    ngOnInit(): void {
        this.suscription=this.shoppingListService.startEditing.subscribe(
            (index:number) => {
                this.editedItemIndex = index;
                this.editMode = true;
                this.editedItem = this.shoppingListService.getIngredient(index);
                this.myForm.setValue({
                    name:this.editedItem.name,
                    amount:this.editedItem.amount
                })
            }
        );
    }

    ngOnDestroy(): void {
        this.suscription.unsubscribe();
    }
    
    onSubmit(form:NgForm){
        const value = form.value;
        const newIngredient = new Ingredient(value.name,value.amount);
        if(this.editMode){
            this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient);
        }else{
            this.shoppingListService.addIngredient(newIngredient);
        }
        this.editMode = false;
        form.reset();
        
        
    }

    onClear(){
        this.myForm.reset();
        this.editMode = false;
    }

    onDelete(){
        this.shoppingListService.deleteIngredient(this.editedItemIndex);
        this.onClear();
    }
}