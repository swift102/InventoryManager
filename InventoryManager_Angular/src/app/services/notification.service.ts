import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  notification$: Observable<Notification> = this.notificationSubject.asObservable();

  constructor() { }

  showSuccess(message: string): void {
    this.notificationSubject.next({
      message,
      type: 'success'
    });
  }

  showError(message: string): void {
    this.notificationSubject.next({
      message,
      type: 'error'
    });
  }
}
