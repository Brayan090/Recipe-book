
import { NgModule } from '@angular/core'
import { AlertComponent } from './alert/alert.component';
import { LoaderSpinnerComponent } from './loader-spiner/loader-spiner.component';
import { PlaceHolderDirective } from './placeHolder.directive';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[	
        AlertComponent,
        LoaderSpinnerComponent,
        PlaceHolderDirective,
        DropdownDirective
   ],
    imports:[
        CommonModule,

    ],
    exports:[
        AlertComponent,
        LoaderSpinnerComponent,
        PlaceHolderDirective,
        DropdownDirective,
        CommonModule
    ]
})

export class SharedModule{}