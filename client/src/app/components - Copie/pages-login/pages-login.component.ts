import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent {
  myForm: FormGroup;
  data: any
  constructor(private formBuilder: FormBuilder, public share: AuthserviceService,
    private toastr: ToastrService,
    private r: Router,
    private arouter: ActivatedRoute,) {

    if (this.share.LoggedIn() == true) {
      console.log(this.share.role)
      if (this.share.getRole() === "Admin") {
        this.r.navigate(["/admin"])
      } else {
        this.r.navigate(["/user"])
      }
    }
    this.myForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.minLength(6)]],

    });







  }


  onSubmit() {
    let data = this.myForm.value





    this.share.login(data).subscribe({
      next: (res: any) => {

        this.data = res

        this.share.saveData(this.data.token)
        this.share.verifRole()
        this.share.getRole()
        this.share.getProfile()
        //this.r.navigate(["/"])



        // this.toastr.success(res.message,'',{
        //   timeOut: 3000,
        // });
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


