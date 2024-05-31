import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bill-item',
  templateUrl: './bill-item.component.html',
  styleUrls: ['./bill-item.component.css']
})
export class BillItemComponent {
  @Input() name :string = "";
  @Input() creator :string = "";
  @Input() amount :number = -1;
  @Input() description :string = "";
  @Input() id :string = "";

  @Output() onBillItemClicked = new EventEmitter<string>();

  billClicked() {
    this.onBillItemClicked.emit(this.id);
  }
}
