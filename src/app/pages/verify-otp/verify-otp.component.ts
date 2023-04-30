import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/services/global.service';
import { HttpHeaderService } from 'src/app/services/http-header.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {
  phone = localStorage.getItem('phoneNumber');

  otpForm = new FormGroup({
    otp: new FormControl('', [Validators.required,Validators.pattern('[0-9]+')])
  })

  constructor(private http:HttpHeaderService, private router:Router) {}

  sendOtp() {

    let model = {
      phoneNumber: this.phone,
      otpCode: this.otpForm.controls.otp.value,
    }

    this.http.Post(Account.postVerifyOtp,model).subscribe({
      next:(res) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 2000
        });

        setTimeout( () => {
          localStorage.removeItem('phoneNumber');
          this.router.navigate(['/login']);
        },2000)

      },
      error:(err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: err.error,
          showConfirmButton: true,
          // test btn by understand
        });

      }
    })

  }

  checkNum() {
    if(!localStorage.getItem('phoneNumber')) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.checkNum();
  }

}
