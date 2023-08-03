import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  
  constructor(private userService: UserService) { }

  @Output() openNotificationEvent = new EventEmitter();
  @Output() onCurrentPageChange = new EventEmitter<number>();
  @Output() resetPageEvent = new EventEmitter();

  currentPage :number = 1;

  displayName$: Observable<String | null> = this.userService.displayName$;

  ngOnInit() {
    console.log(this.displayName$);
    
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
