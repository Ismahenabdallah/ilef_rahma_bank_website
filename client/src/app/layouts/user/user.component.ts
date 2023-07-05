import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ServicesService } from 'src/app/services/adminservices.service';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  myForm: FormGroup;

  users: any = []
  dataUser = {
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    compteBancaire: "",
    creditDemande: "",

    CIN: "",
    isAdmin: "",
    role: "",
  };
  decodeToken: any
  refresh: boolean = false
  constructor(private formBuilder: FormBuilder, public share: UserserviceService, public authen: AuthserviceService, public admin: ServicesService,
    private toastr: ToastrService,
    public r: Router,
    private arouter: ActivatedRoute,) {


    if (this.checkLocalStorage('TokenCompteBancaire')) {
      this.refresh = true;
    }


    authen.getProfile();
    console.log(authen.getProfile())
    this.myForm = this.formBuilder.group({

      Solde_Cpt: ['', [Validators.required]],

      Type_Cpt: ['', [Validators.required]],

    });







  }
  checkLocalStorage(key: string): boolean {
    const value = localStorage.getItem(key);
    return value !== null && value !== '' && value !== 'undefined';
  }

  onSubmit() {
    let data = this.myForm.value





    this.share.createCompte(data).subscribe({
      next: (res: any) => {



        localStorage.setItem("TokenCompteBancaire", res.TokenCompteBancaire)
        this.r.navigate(["/user/account"])
        this.toastr.success(res.message, '', {
          timeOut: 3000,
        });
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
        this.toastr.error(err.error.message, '', {
          timeOut: 3000,
        });
        //console.log(err.error)
      },

    })
  }

}
