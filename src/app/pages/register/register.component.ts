import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpHeaderService } from 'src/app/services/http-header.service';
import { Account } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { UserForRegister } from 'src/app/models/user-for-register';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  disabilityVal = false;
  disability() {
    this.disabilityVal = !this.disabilityVal;
  }

  errorFirstName = '';
  errorLastName = '';
  errorEmail = '';
  errorPhoneNumber = [];
  errorNationalId = '';
  errorGender = '';
  errorPassword = '';

  constructor(
    private http: HttpHeaderService,
    private router: Router,
    private accountService: AccountService
  ) {}

  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    national: new FormControl('', [
      Validators.required,
      Validators.pattern('^784-(19|20)\\d{2}-\\d{7}-\\d{1}$'),
    ]),
    tel: new FormControl('', [Validators.required]),
    // tel: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    gender: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
      ),
    ]),
  });

  gender = ['Female', 'Male'];

  register() {
    let model: UserForRegister = {
      firstName: this.registerForm.controls.firstName.value!,
      lastName: this.registerForm.controls.lastName.value!,
      email: this.registerForm.controls.email.value!,
      nationalId: this.registerForm.controls.national.value!,
      password: this.registerForm.controls.password.value!,
      phoneNumber: this.registerForm.controls.tel.value!,
      gender: this.registerForm.controls.gender.value!,
      hasDisability: this.disabilityVal,
      // DisabilityImage: '',
    };

    this.accountService.register(model).subscribe(
      (data) => {
        console.log(data);
        let phone = this.registerForm.controls.tel.value;
        localStorage.setItem('phoneNumber',phone??'');
        this.router.navigate(['/verify-otp']);
      },
      (err) => {
        console.error(err.error);
        Swal.fire({
          icon: 'error',
          // title: 'Success',
          text: err.error[1],
          showConfirmButton: true,

        });
        // console.log(err.error);

        this.errorPhoneNumber = err.error.errors.PhoneNumber;
      }
    );

    // Your code as comments
    // this.http.Post(Account.postRegister, model).subscribe({
    //   next:(res) => {
    //     console.log(res);
    //     let phone = this.registerForm.controls.tel.value;
    //     localStorage.setItem('phoneNumber',phone??"");
    //     this.router.navigate(['/verify-otp']);

    //   },
    //   error:(err) => {
    //     console.log(err);

    //   }
    // })
    // console.log(model);
  }

  checkUser() {
    if(localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.checkUser();
  }
}
