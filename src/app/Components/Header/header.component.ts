import { Component, OnDestroy, OnInit} from "@angular/core";
import { DataStoreService } from "src/app/shared/data-store.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})

export class HeaderComponent implements OnInit,OnDestroy{
    isAuthenticated = false;
    isOpen = false;
    private userSub:Subscription;

    constructor(private dataService:DataStoreService,private authService:AuthService){}

    ngOnInit(): void {
        this.userSub=this.authService.user.subscribe(user=>{
            this.isAuthenticated = !user? false:true;
        });
    }
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

    onSave(){
        this.dataService.storeRecipes();
    }

    onFetchRecipes(){
        this.dataService.fetchRecipes().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }

    openMenu(){
        this.isOpen = !this.isOpen;
    }

}