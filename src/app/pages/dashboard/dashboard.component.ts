import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor() {}

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');

    location.href = '/login';
  }
}
