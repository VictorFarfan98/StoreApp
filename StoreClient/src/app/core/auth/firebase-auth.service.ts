import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  userData: Observable<any>;
  authToken: string;

  constructor(private angularFireAuth: AngularFireAuth) { 
    this.userData = angularFireAuth.authState;
  }

  /* Sign in */
  async SignIn() {
    this.angularFireAuth
      .signInWithEmailAndPassword("test@test.com", "123123")
      .then(async res => {
        (await this.angularFireAuth.currentUser).getIdToken(true).then( token => {
          this.authToken = token;
        })
      })
      .catch(err => {
        console.error('Something went wrong:',err.message);
      });
  }
    
  /**
   * Sign out of the app
   */
  SignOut() {
    this.angularFireAuth.signOut();
    this.authToken = "";
  }
}
