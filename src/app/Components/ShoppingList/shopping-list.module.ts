import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shoppingList.component";
import { ShoppingEditComponent } from "./ShoppingEdit/shoppingEdit.component";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";


const route:Routes = [
    {path:'',component:ShoppingListComponent},
]

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent,

    ],
    imports:[
        SharedModule,
        FormsModule,
        RouterModule.forChild(route),
    ],
    exports:[],
})

export class ShoppingListModule{}