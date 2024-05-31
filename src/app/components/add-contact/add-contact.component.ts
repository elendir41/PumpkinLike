import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { BillService } from 'src/app/services/bill.service';
import { FriendService } from 'src/app/services/friend.service';
import { UserService } from 'src/app/services/user.service';
import { NgModel, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent  {
  constructor(private friendService: FriendService, private userService: UserService) {
  }

  public nameToFind: string = "";
  foundUsers: User[] = [];
  friends: User[] = [];
  sendUsers: User[] = [];
  receiveInvits: User[] = [];

  ngOnInit(): void {
    this.waitForFriends();
    this.waitForSend();
    this.waitForReceive();
  }

  async waitForFriends() {
    this.friends = await this.friendService.getFriendsFromUser();
  }

  async waitForSend() {
    this.sendUsers = await this.friendService.getSended();
  }

  async waitForReceive() {
    this.receiveInvits = await this.friendService.getReceived();
  }

  async onSearchButton() {
    if (this.nameToFind !== "") {
      this.foundUsers = [];
      const users = await this.userService.getUserFromEmail(this.nameToFind);
      const existingRequests = await this.friendService.getRelationShipFromUser();
      users.forEach(user => {
        if (!existingRequests.find(requestDoc => requestDoc.receiverId === user.uid || requestDoc.senderId === user.uid)) {
          this.foundUsers.push(user);
        }
      })
    }
  }

  sendInvit(userId: string | undefined) {
    if (userId) {
      console.log(`sending to: ${userId}`);
      
      this.friendService.sendInvit(userId);
      const index = this.foundUsers.findIndex(user => user.uid === userId);
      if (index !== -1) {
        this.foundUsers.splice(index, 1);
      }
    }
  }

  accept(userId: string | undefined) {

  }
}
