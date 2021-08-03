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
        console.log(`You're in!`);
        console.log(res);
        (await this.angularFireAuth.currentUser).getIdToken(true).then( token => {
          console.log("Token")
          console.log(token)
          this.authToken = token;
        })
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
    this.authToken = "";
  }
}
