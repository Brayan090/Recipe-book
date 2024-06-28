import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceHolderDirective } from 'src/app/shared/placeHolder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {

  islogginMode = true;
  isLoading:boolean;

  @ViewChild(PlaceHolderDirective) alertHost:PlaceHolderDirective;
  private closeSub:Subscription;


  constructor(private authService:AuthService, private router:Router, private ComponentFactoryResolver:ComponentFactoryResolver) { }

  ngOnInit() {

    this.authService.isLoading.subscribe(
      isLoading=>this.isLoading=isLoading
    );

    this.authService.error.subscribe(
      error=>this.showErrorAlert(error)
    )

  }
  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    
  }

  onSwitchMode(){
    this.islogginMode= !this.islogginMode;
  }

  onSubmit(form:NgForm){
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    if (this.islogginMode) {
      this.authService.login(email, password);
    }else{
      this.authService.signup(email, password);
    }
    form.reset();
  }

  showErrorAlert(message:string){
    const alertComponentFact=this.ComponentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContRef = this.alertHost.viewContainerRef;
    hostViewContRef.clear();

    const componentRef=hostViewContRef.createComponent(alertComponentFact);

    componentRef.instance.message=message;
    this.closeSub=componentRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostViewContRef.clear();
    });

  }

}
