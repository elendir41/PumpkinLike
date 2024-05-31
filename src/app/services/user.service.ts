import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { where, collection, query, getDocs, and, or } from 'firebase/firestore';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  authState$: Observable<firebase.default.User | null> = this.afAuth.authState;

  displayEmail$: Observable<string | null> = this.authState$.pipe(
    map(user => {    
      return !user ? null : user.email;
    })
  )

  userId: string | undefined = "";

  addUser(user: User): void {
    console.log(user);
    this.db.collection("/Users").doc(user.uid).set(user);
  }

  async getUsersFromArray(usersId: string[]) :Promise<User[]> {
    if (usersId.length === 0) {
      console.log("no user found");
      return [];
    }
    const usersRef = collection(this.db.firestore, "/Users");
    const q = query(usersRef, where("uid", "in", usersId));
    const querySnapshot = await getDocs(q);
    const users: User[] = [];
    querySnapshot.forEach(doc => {
      users.push(doc.data() as User);
    })

    return users;
  }

  async getUserFromEmail(email: string) {
    const users: User[] = [];
    console.log(`current user id: ${this.userId}`);
    console.log(`email a trouver: ${email}`);
    
    

    const usersRef = collection(this.db.firestore, "/Users");
    const q = query(usersRef, and(
      where("email", ">=", email), 
      where("email", "<=", email + "\uf8ff"))); // caractère de fin de requête
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      const user: User = doc.data() as User;
      if (user.uid !== this.userId)
        users.push(user);
    })
    return users;
  }

  async getCurrentUserName() {
    let name = "";
    const usersRef = collection(this.db.firestore, "/Users");
    const q = query(usersRef, where("uid", "==", this.userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      const user = doc.data() as User;
      name = user.name;
    })
    return name;
  }
}
