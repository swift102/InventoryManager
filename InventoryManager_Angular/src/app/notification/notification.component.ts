import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService, Notification } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private subscription: Subscription | null = null;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.subscription = this.notificationService.notification$.subscribe(notification => {
      this.notifications.push(notification);
      setTimeout(() => this.removeNotification(notification), 5000); // Auto remove after 5 seconds
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  removeNotification(notification: Notification): void {
    const index = this.notifications.indexOf(notification);
    if (index >= 0) {
      this.notifications.splice(index, 1);
    }
  }
}

