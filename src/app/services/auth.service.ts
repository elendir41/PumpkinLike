import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Subject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth, private userService: UserService) { }

  private userLoggedInSubject = new Subject<boolean>();

  async login(email: string, password: string): Promise<void> {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        if (userCredential) {
          this.userLoggedInSubject.next(true);
        }
        return userCredential;
      });
  }

  async register(email: string, password: string, name: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      if (userCredential) {
        this.userService.addUser({
          uid: userCredential.user?.uid,
          name: name,
          email: email,
          photoUrl: "",
          isAdmin: false
        })
        this.userLoggedInSubject.next(true);
      }
      return userCredential;
    });
  }

  logout(): void{
    this.afAuth.signOut();
  }

  onUserLoggedIn() {
    return this.userLoggedInSubject.asObservable();
  }
}
