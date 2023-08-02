import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  bills = [
    {
      name:"description trop longue",
      description:"Ceci est une description Ceci est une description Ceci est une description Ceci est une description Ceci est une description Ceci est une description Ceci est une description Ceci est une description Ceci est une description Ceci est une description Ceci est une description",
      amount: 1000,
      author:"Orhtense la Giga Dépense"
    },
    {
      name:"nom beaucoup trop long pour uniquement le titre de l'ardoise",
      description:"Ceci est une description",
      amount:1000,
      author:"Orhtense la Dépense"
    },
    {
      name:"La premiere ardoise",
      description:"Ceci est une description",
      amount:1000,
      author:"Orhtense la Dépense"
    },
    {
      name:"author trop long",
      description:"Ceci est une description",
      amount:1000,
      author:"Orhtense la Giga Dépense avec un nom trop long"
    },
    {
      name:"dépense trop longue",
      description:"Ceci est une description",
      amount:1000,
      author:"Orhtense la Giga Dépense"
    },
  ]

  @Input() currentBill :number = -1;

  constructor() {
    console.log(this.currentBill);
    
  }

  onBillItem(id: number) {
    this.currentBill = id;
  }
}
