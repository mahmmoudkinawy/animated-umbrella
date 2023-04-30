import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { UserForRegister } from '../models/user-for-register';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { UserForLogin } from '../models/user-for-login';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  currentUser$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient) {}

  login(userForLogin: UserForLogin) {
    return this.http
      .post<User>(`${environment.apiUrl}/v1/account/login`, userForLogin)
      .pipe(map((user) => this.setUserToLocalStorage(user)));
  }

  register(userForRegister: UserForRegister) {
    const form = new FormData();

    form.append('firstName', userForRegister.firstName);
    form.append('lastName', userForRegister.lastName);
    form.append('phoneNumber', userForRegister.phoneNumber);
    form.append('nationalId', userForRegister.nationalId);
    form.append('gender', userForRegister.gender);
    form.append('hasDisability', userForRegister.hasDisability.toString());
    form.append('email', userForRegister.email);
    form.append('password', userForRegister.password);

    return this.http.post(`${environment.apiUrl}/v1/account/register`, form);
  }

  setUserToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser$.next(user);
  }
}
