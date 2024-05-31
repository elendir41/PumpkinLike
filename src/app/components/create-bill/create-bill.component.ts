import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Bill } from 'src/app/models/bill.model';
import { FriendService } from 'src/app/services/friend.service';
import { AuthService } from 'src/app/services/auth.service';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css']
})
export class CreateBillComponent implements OnInit {

  createForm: FormGroup;

  friends: User[] = [];

  get membersFormArray() {
    return this.createForm.controls['members'] as FormArray;
  }

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private billService: BillService,
    private friendService: FriendService) {
    this.createForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', []],
      members: new FormArray([]),
    });

  }

  async ngOnInit(): Promise<void> {
    this.friends = await this.friendService.getFriendsFromUser();
    this.friends.forEach(() =>
      this.membersFormArray.push(new FormControl(false))
    );
  }

  create() {
    if (this.authService.currentUserUid) {

      const selectedMembers = this.createForm.value.members
        .map((checked: boolean, i: number) => checked ? this.friends[i].uid : null)
        .filter((v: User) => v !== null);

      const newBill: Bill = {
        id: "",
        name: this.createForm.value.name,
        description: this.createForm.value.description,
        creator: this.authService.currentUserName,
        amount: 0,
        expenses: [],
        balance: {}
      }

      selectedMembers.forEach((id:string) => {
        newBill.balance[id] = 0;
      });
      newBill.balance[this.authService.currentUserUid] = 0;

      this.billService.addBill(newBill);
    }
  }
}
