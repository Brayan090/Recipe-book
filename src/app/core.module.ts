import { NgModule } from '@angular/core'
import { RecipeService } from './Services/recipe.service';
import { ShoppingListService } from './Services/shoppingList.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Components/auth/auth-interceptor';

@NgModule({

    providers:[
        RecipeService,
        ShoppingListService,

        {
            provide:HTTP_INTERCEPTORS,
            useClass:AuthInterceptor,
            multi:true
        }
    ]

})

export class CoreModule{}