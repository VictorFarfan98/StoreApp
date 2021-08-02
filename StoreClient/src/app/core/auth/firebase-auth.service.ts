import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  userData: Observable<any>;

  constructor(private angularFireAuth: AngularFireAuth) { 
    this.userData = angularFireAuth.authState;
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(`You're in!`);
        console.log(res);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }
    
  /**
   * Sign out of the app
   */
  SignOut() {
    this.angularFireAuth.signOut();
  }
}
