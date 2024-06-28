import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from './auth/auth.model';
import { RecipeService } from 'src/app/Services/recipe.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoading = new BehaviorSubject<boolean>(false);
  error= new Subject<string>();
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private afAuth: AngularFireAuth, private router: Router,private recipeService:RecipeService) { }

  getUser() {
    return this.afAuth.authState;
  }

  async signup(email: string, password: string) {
    this.isLoading.next(true);
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      this.handleAuthentication(user.email, user.uid, await user.getIdToken(), (await user.getIdTokenResult()).expirationTime);
      this.isLoading.next(false);
      this.router.navigate(['/recipes'])
    } catch (error) {
      this.handleError(error);
      this.isLoading.next(false);
    }
  }

  async login(email: string, password: string) {
    this.isLoading.next(true);
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      this.handleAuthentication(user.email, user.uid, await user.getIdToken(), (await user.getIdTokenResult()).expirationTime);
      this.isLoading.next(false);
      this.router.navigate(['/recipes'])
    } catch (error) {
      this.handleError(error);
      this.isLoading.next(false);
    }
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.afAuth.signOut();
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    this.recipeService.clearRecipes()
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: string) {
    const expirationDate = new Date(expiresIn);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expirationDate.getTime() - new Date().getTime());
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email exists already!';
          break;
        case 'auth/invalid-login-credentials':
          errorMessage = 'Incorrect credentials!';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'You have exceeded the number of requests!';
          break;
      }
    }
    this.error.next(errorMessage);
  }

}
