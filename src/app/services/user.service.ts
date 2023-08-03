import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  authState$: Observable<firebase.default.User | null> = this.afAuth.authState;

  displayName$: Observable<string | null> = this.authState$.pipe(
    map(user => {    
      return !user ? null : user.email;
    })
  )

  addUser(user: User): void {
    console.log(user);
    
    this.db.collection("/Users").doc(user.uid).set(user);
  }
}
