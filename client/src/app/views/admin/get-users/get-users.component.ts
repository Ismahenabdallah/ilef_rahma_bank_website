import { Component, OnDestroy } from '@angular/core';
import { ServicesService } from 'src/app/services/adminservices.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthserviceService } from 'src/app/services/authservice.service';
@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent implements OnDestroy {


  getall: Subscription
  users: any = []
  myForm: FormGroup;
  hasClientUser: any;
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
  }
  query: any;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private share: ServicesService, private route: Router, private auth: AuthserviceService) {

    this.getall = this.share.getAllusers().subscribe((data: any) => {
      //console.log("users",data)
      this.users = data
      this.hasClientUser = this.users.some((user: any) => user.role === 'User');
      console.log(this.hasClientUser)

    })

    this.myForm = this.formBuilder.group({

      email: ['', [Validators.email, Validators.required]],


      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required, Validators.minLength(6)]],

      CIN: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],


    })

  }

  messageError = ''


  Del(id: any, i: number) {
    this.share.deleteUser(id).subscribe({
      next: (res: any) => {
        this.route.navigate(['/admin/all'])
        this.users.splice(i, 1)
        this.toastr.success(res.message, '', {
          timeOut: 3000,
        });
      }, // nextHandler


    });

  }


  getbyid(id: any) {
    this.share.getById(id).subscribe((res: any) => {
      this.dataUser._id = res.user._id
      this.dataUser.email = res.user.email
      this.dataUser.compteBancaire = res.user.compteBancaire
      this.dataUser.creditDemande = res.user.creditDemande
      this.dataUser.isAdmin = res.user.isAdmin
      this.dataUser.role = res.user.role
      this.dataUser.CIN = res.user.CIN
      this.dataUser.firstName = res.user.firstName
      this.dataUser.lastName = res.user.lastName


    })

  }
  Add() {
    let data = this.myForm.value
    // console.log(data)
    this.share.addUsers(data).subscribe({
      next: (res: any) => {
        this.route.navigate(['/admin/all'])
        //console.log("res", res.newUser)

        this.users.push(res.newUser)


        this.toastr.success(res.message, '', {
          timeOut: 3000,
        });
      }, // nextHandler
      error: (err: HttpErrorResponse) => {
        this.messageError = err.error.msg
        this.toastr.error(err.error.msg, '', {
          timeOut: 3000,
        });
        //console.log(err.error)
      }, // errorHandler


    });

  }
  update(form: any) {
    let data = form.value
    this.share.updateUser(this.dataUser._id, data).subscribe((res: any) => {

      let indexId = this.users.findIndex((obj: any) => obj._id == this.dataUser._id)

      console.log(res)





      this.users[indexId].firstName = res.user.firstName
      this.users[indexId].lastName = res.user.lastName
      this.toastr.success(res.message, '', {
        timeOut: 3000,
      });


    })
  }
  details(id: any) {
    this.route.navigate([`/admin/details/${id}`])
  }


  // search() {
  //   this.share.searchUsers(this.query).subscribe(users => {
  //     this.users = users;
  //     console.log(users)
  //     console.log(this.query)
  //   });
  // }


  ngOnDestroy(): void {
    this.getall.unsubscribe()
  }
}
