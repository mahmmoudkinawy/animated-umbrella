import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(private router:Router) {}

  checkUser() {
    if(!localStorage.getItem('token')) {
      location.href = '/login';
      // this.router.navigate(['/login']);
    }
  }


  ngOnInit(): void {
    this.checkUser();
  }

}
