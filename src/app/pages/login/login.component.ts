import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/services/global.service';
import { HttpHeaderService } from 'src/app/services/http-header.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly dispose$ = new Subject();
  hide = true;
  // loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpHeaderService,
    private router: Router,
    private accountService: AccountService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  ngOnInit(): void {
    this.checkUser();

  }

  // onSubmit() {
  //   this.accountService
  //     .login(this.loginForm.value)
  //     .pipe(takeUntil(this.dispose$))
  //     .subscribe(
  //       () => this.router.navigateByUrl('/'),
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }

  login() {

    this.http.Post(Account.postLogin, this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', res.name);
        location.href = '/';

      },
      error: (err) => {
        if (err.error == 'Invalid email address or password. Please check your credentials and try again.') {
          Swal.fire({
            icon: 'error',
            text: err.error,
            showConfirmButton: true
          })
        } else {
          Swal.fire({
            icon: 'warning',
            text: err.error,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Verify Otp',
            denyButtonText: `cancel`,
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/verify']);
            } else if (result.isDenied) {
              Swal.fire({
                icon: 'error',
                title: 'To login, the phone number must be confirmed.',
                showConfirmButton: false,
                timer: 2000
                  })
            }
          });
        }
      },
    })
  }

  checkUser() {
    if (localStorage.getItem('token')) {
      location.href = '/';
      // this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.dispose$.next(null);
    this.dispose$.complete();
  }
}
