import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  User,
} from '@angular/fire/auth';
import {
  Functions,
  getFunctions,
  httpsCallable,
} from '@angular/fire/functions';
import { IUser } from '../../../modules/login/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);

  constructor() {
  }

  isLogger(){
    const userState = authState(this.auth);
    userState.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      console.log(aUser);
    });
  }
  async logIn(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async signUp(email: string, password: string, name: string) {
    const functions = getFunctions();
    const createUser = httpsCallable(functions, 'createUser');
    const userNew = {
      name: name,
      email: email,
      password: password,
    };

    console.log(createUser);

    createUser(userNew).then((result) => {
      console.log('result: ', result);

      const data = result.data;
      console.log(data);
    });
  }
}
