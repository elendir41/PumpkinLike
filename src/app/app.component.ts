import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pumpkin-like';
  notificationOpen :number = 17;
  notificationClose :number = 0;
  notificationWidth :Number = this.notificationClose;

  currentPage :number = 0;
  currentBill :number = -1;

  toggleNotificationPanel() {
    this.notificationWidth = this.notificationWidth == this.notificationOpen ? this.notificationClose : this.notificationOpen;
  }

  changeCurrentPage(number: number) {
    this.currentPage = number;
  }

  resetPage() {
    this.currentBill = -1;
    this.currentPage = 1;
    // alert("reset")
  }

  quit() {
    this.currentPage = 1;
  }

  goToHomePage() {
    this.currentPage = 1;
  }
}
