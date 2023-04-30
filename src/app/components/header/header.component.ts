import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  login = false;

  dashboard = false;
  name= localStorage.getItem('name');
  _name = 'Super Admin';
  constructor(private router: Router) { }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');

    location.href = '/login';
  }

  checkUser() {
    if (localStorage.getItem('token')) {
      this.login = true;
    } else {
      this.login = false;
    }
  }

  checkAdmin() {
    console.log(this.name);
    console.log(this._name);

    if (this.name === this._name) {
      this.dashboard = true;
    } else {
      this.dashboard = false;
    }
  }


  ngOnInit(): void {
    this.checkUser();
    this.checkAdmin();
  }

}
