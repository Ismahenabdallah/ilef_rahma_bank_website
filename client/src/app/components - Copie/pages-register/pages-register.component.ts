import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { ToastrService } from 'ngx-toastr';

import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-pages-register',
  templateUrl: './pages-register.component.html',
  styleUrls: ['./pages-register.component.css']
})
export class PagesRegisterComponent {



  myForm: FormGroup;
  data: any
  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, public share: AuthserviceService, private r: Router) {
    this.myForm = this.formBuilder.group({
      firstName: ['', [Validators.required,]],
      lastName: ['', [Validators.required,]],

      CIN: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required, Validators.minLength(6)]]
    });
    if (this.share.LoggedIn() == true) {
      console.log(this.share.role)
      if (this.share.getRole() === "Admin") {
        this.r.navigate(["/admin"])
      } else {
        this.r.navigate(["/user"])
      }
    }



  }
  onSubmit() {
    console.log(this.myForm.value);

    let data = this.myForm.value


    this.share.register(data).subscribe({
      next: (res: any) => {

        this.data = res
        console.log(res)


        this.r.navigate(['/login'])



        this.toastr.success(res.message, '', {
          timeOut: 3000,
        });
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
        this.toastr.error(err.error.msg, '', {
          timeOut: 3000,
        });
        //console.log(err.error)
      },

    })

  }

}
