import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bill-item',
  templateUrl: './bill-item.component.html',
  styleUrls: ['./bill-item.component.css']
})
export class BillItemComponent {
  @Input() name :string = "";
  @Input() author :string = "";
  @Input() amount :number = -1;
  @Input() description :string = "";
  @Input() id :number = -1;

  @Output() onBillItemClicked = new EventEmitter<number>();

  billClicked() {
    this.onBillItemClicked.emit(this.id);
  }
}
