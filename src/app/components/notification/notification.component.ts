import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications = [
    {
      username: 'John Doe',
      avatar: 'path-to-avatar-image-1.jpg',
      message: 'This is a notification message.'
    },
    {
      username: 'Jane Smith',
      avatar: 'path-to-avatar-image-2.jpg',
      message: 'Another notification message here.'
    },
    {
      username: 'Alice Johnson',
      avatar: 'path-to-avatar-image-3.jpg',
      message: 'A new notification just arrived.'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
