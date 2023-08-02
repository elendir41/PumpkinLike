import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.css']
})
export class NotificationPanelComponent {

  @Output() closePanelEvent = new EventEmitter();

  notifications = [
    {
      user: "toto",
      message: "Tu dois de la thune"
    },
    {
      user: "TATA",
      message: "Ca vient quand"
    }
  ]

  closePanel() {
    this.closePanelEvent.emit();
  }
}
