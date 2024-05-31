import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { doc, getDoc } from 'firebase/firestore'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth, private userService: UserService, private db: AngularFirestore) { }

  private userLoggedInSubject = new Subject<boolean>();

  currentUserUid : string | undefined = undefined;
  currentUserName: string  = "";

  async login(email: string, password: string): Promise<void> {
    const user = await this.afAuth.signInWithEmailAndPassword(email, password)
      .then(async userCredential => {
        if (userCredential) {
          this.userLoggedInSubject.next(true);
          this.currentUserUid = userCredential.user?.uid;
          this.userService.userId = this.currentUserUid;
          this.currentUserName = await this.userService.getCurrentUserName();
        }
        return userCredential;
      })
      .catch(err => {
        console.log("fail to login");
        this.userLoggedInSubject.next(false);
      });
  }

  async register(email: string, password: string, name: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      if (userCredential) {
        this.currentUserUid = userCredential.user?.uid;
        this.userService.userId = this.currentUserUid;
        this.currentUserName = name;
        this.userService.addUser({
          uid: this.currentUserUid,
          name: name,
          email: email,
          photoUrl: "",
          isAdmin: false
        });
        this.userLoggedInSubject.next(true);
      }
      return userCredential;
    });
  }

  logout(): void{
    this.afAuth.signOut();
    this.currentUserUid = "";
    this.userService.userId = "";
    this.currentUserName = "";
  }

  onUserLoggedIn() {
    return this.userLoggedInSubject.asObservable();
  }
}
