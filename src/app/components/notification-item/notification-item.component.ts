import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent {
  @Input() user : String = "";
  @Input() message : String = "";
}
