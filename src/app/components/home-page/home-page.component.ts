import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';
import { User } from '../../models/user.model'
import { Bill } from '../../models/bill.model'


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  constructor(private billService: BillService) {    
  }

  @Input() currentBill :string = "";

  bills :Bill[]= []

  async ngOnInit(): Promise<void> {
    this.bills = this.billService.bills;
    this.billService.getBillObservable().subscribe(() => {
      this.bills = [];

      this.bills = this.billService.bills;
      setTimeout(() => {
      }, 100);
    })
    // this.billService.getBillUpdateObservable().subscribe((bill) => {
    //   this.displayNBBills();
    //   console.log(bill.id);
      
    //   const index = this.bills.findIndex(b => {
    //     console.log(b.id);
        
    //     return b.id === bill.id
    //   })

    //   if (index !== -1) {
    //     this.bills[index] = bill;
    //   }
    //   else {
    //     console.log("index not found");
    //   }
    // })
    

    // this.billService.getBillAddObservable().subscribe((bill) => {
    //   this.displayNBBills();
    //   this.bills.push(bill);
    // })

    // this.billService.getBillRemoveObservable().subscribe((bill) => {
    //   const index = this.bills.findIndex(b => {
    //     return b.id === bill.id
    //   })

    //   if (index !== -1) {
    //     this.bills.splice(index, 1);
    //   }
    //   else {
    //     console.log("index not found");
    //   }
    // })
  }

  displayNBBills() {
    // console.log(this.bills.length);
  }


  onBillItem(id: string) {
    this.currentBill = id;
  }
}
