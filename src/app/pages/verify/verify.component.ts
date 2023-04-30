import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaderService } from 'src/app/services/http-header.service';
import { Router } from '@angular/router';
import { Account } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  otp = false;

  phoneForm = new FormGroup({
    phoneNumber: new FormControl('', Validators.required)
  })

  otpForm = new FormGroup({
    otp: new FormControl('', [Validators.required,Validators.pattern('[0-9]+')])
  })

  constructor(private http:HttpHeaderService, private router:Router) {}

  sentCode() {
    let model = {
      phoneNumber : this.phoneForm.controls.phoneNumber.value!,
    }
    this.http.Post(Account.postsentOtp, model).subscribe({
      next:(res) => {
        console.log(res);
        this.otp = true;
        Swal.fire({
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        })
      },
      error:(err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.errors.PhoneNumber[0],
          showConfirmButton: true,
        })
        console.log(err.error);

      }
    })
  }

  sentOtp() {

    let model = {
      phoneNumber: this.phoneForm.controls.phoneNumber.value,
      otpCode: this.otpForm.controls.otp.value,
    }

    this.http.Post(Account.postVerifyOtp,model).subscribe({
      next:(res) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        });

        setTimeout( () => {
          localStorage.clear();
          this.router.navigate(['/login']);
        },1500)

      },
      error:(err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: err.error,
          showConfirmButton: true,
        });

      }
    })

  }

  checkNum() {
    if(!localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // this.checkNum();
  }

}
