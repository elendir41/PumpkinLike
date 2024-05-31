import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { BillService } from 'src/app/services/bill.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  
  constructor(private userService: UserService, private billService: BillService) { }

  @Output() openNotificationEvent = new EventEmitter();
  @Output() onCurrentPageChange = new EventEmitter<number>();
  @Output() resetPageEvent = new EventEmitter();

  currentPage :number = 1;

  ngOnInit() {
    
  }

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
