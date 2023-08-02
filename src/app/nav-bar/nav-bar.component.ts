import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Output() openNotificationEvent = new EventEmitter();
  @Output() onCurrentPageChange = new EventEmitter<number>();
  @Output() resetPageEvent = new EventEmitter();

  currentPage :number = 1;

  onChangePageButton(number: number) {
    this.currentPage = number;
    this.onCurrentPageChange.emit(number);
  }
  
  openNotificationPanel() {
    this.openNotificationEvent.emit();
  }

  resetPage() {
    this.onChangePageButton(1);
    this.resetPageEvent.emit();
  }
}
