import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

import { and, collection, getDocs, or, query,where } from "firebase/firestore";
import { UserService } from './user.service';
import { User } from '../models/user.model'
import { friendship } from '../models/friendship.model';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private authService: AuthService, private userService: UserService, private db: AngularFirestore) { }

  async getFriendsFromUser() :Promise<User[]> {
    if (!this.authService.currentUserUid || this.authService.currentUserUid === "")
      return [];
    const friendsRef = collection(this.db.firestore, "/Friends");
    const q = query(friendsRef, 
      and(
        where("isAccepted", "==", true),
        or(
          where('senderId', "==", this.authService.currentUserUid),
          where('receiverId', "==", this.authService.currentUserUid)
        )
      )
    );

    const friendsID: string[] = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data()['senderId'] === this.authService.currentUserUid) {
        friendsID.push(doc.data()['receiverId']);
      }
      else {
        friendsID.push(doc.data()['senderId']);
      }
    })
    return this.userService.getUsersFromArray(friendsID);
  }


  async getSended() :Promise<User[]> {
    if (!this.authService.currentUserUid || this.authService.currentUserUid === "")
      return [];
    const friendsRef = collection(this.db.firestore, "/Friends");
    const q = query(friendsRef, 
      and(
        where("isAccepted", "==", false),
          where('senderId', "==", this.authService.currentUserUid)
      )
    );

    const friendsID: string[] = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data()['senderId'] === this.authService.currentUserUid) {
        friendsID.push(doc.data()['receiverId']);
      }
      else {
        friendsID.push(doc.data()['senderId']);
      }
    })
    return this.userService.getUsersFromArray(friendsID);
  }


  async getReceived() :Promise<User[]> {
    if (!this.authService.currentUserUid || this.authService.currentUserUid === "")
      return [];
    const friendsRef = collection(this.db.firestore, "/Friends");
    const q = query(friendsRef, 
      and(
        where("isAccepted", "==", false),
          where('receiverId', "==", this.authService.currentUserUid)
      )
    );

    const friendsID: string[] = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data()['senderId'] === this.authService.currentUserUid) {
        friendsID.push(doc.data()['receiverId']);
      }
      else {
        friendsID.push(doc.data()['senderId']);
      }
    })
    return this.userService.getUsersFromArray(friendsID);
  }
  checkValidInvitation(userId: string): boolean {
    // TODO checker si l'invit est valide
    return true;
  }

  sendInvit(userId: string) {
    if (!this.authService.currentUserUid || this.authService.currentUserUid === "") {
      console.log("Nobody connected");
      return;
    }

    const friendShipId = this.db.createId();
    const friendShip: friendship = {
      senderId: this.authService.currentUserUid,
      receiverId: userId,
      isAccepted: false
    }
    this.db.collection("/Friends").doc(friendShipId).set(friendShip);
  }


  async getRelationShipFromUser(): Promise<friendship[]> {
    const userId = this.authService.currentUserUid;
    const friendsRef = collection(this.db.firestore, "/Friends");
    const q = query(friendsRef, 
      or(
        where("senderId", "==", userId),
        where("receiverId", "==", userId),
      )
    );
    const friendships : friendship[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      friendships.push(doc.data() as friendship);
    })

    return friendships;
  }
}
