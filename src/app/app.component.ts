import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService) { }

  title = 'Soutrouille';
  notificationOpen :number = 17;
  notificationClose :number = 0;
  notificationWidth :Number = this.notificationClose;

  currentPage :number = 0; 
  currentBill :string = "";

  ngOnInit() {
    this.authService.onUserLoggedIn().subscribe(connected => {
      if (connected)
        this.currentPage = 1;
    })
  }

  toggleNotificationPanel() {
    this.notificationWidth = this.notificationWidth == this.notificationOpen ? this.notificationClose : this.notificationOpen;
  }

  changeCurrentPage(number: number) {
    this.currentPage = number;
  }

  resetPage() {
    this.currentBill = "";
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
