import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  dataUser = {
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    compteBancaire: "",
    creditDemande: "",
    Solde_Cpt: "",
    _id_Cpt: "",
    Type_Cpt: "",
    CIN: "",
    isAdmin: "",
    role: "",
  }

  refresh: boolean = false
  constructor(private share: AuthserviceService, private userService: UserserviceService, private toastr: ToastrService) {
    this.findMyAccount()
    if (this.checkLocalStorage('TokenCompteBancaire')) {
      this.refresh = true;
    }

    console.log(this.dataUser)
  }

  ngOnInit(): void {
    this.findMyAccount();
    console.log(this.dataUser)
  }
  checkLocalStorage(key: string): boolean {
    const value = localStorage.getItem(key);
    return value !== null && value !== '' && value !== 'undefined';
  }

  update(form: any) {
    let data = form.value
    this.userService.updateMyAccount(data).subscribe((res: any) => {

      //let indexId = this.users.findIndex((obj: any) => obj._id == this.dataUser._id)

      console.log(res)





      // this.users[indexId].firstName = res.user.firstName
      // this.users[indexId].lastName = res.user.lastName
      this.toastr.success(res.message, '', {
        timeOut: 3000,
      });


    })
  }
  findMyAccount() {
    this.userService.findMyAccount().subscribe((res: any) => {
      console.log("My Account", this.dataUser)
      this.dataUser._id = res.user._id
      this.dataUser.CIN = res.user.CIN
      this.dataUser.firstName = res.user.firstName
      this.dataUser.lastName = res.user.lastName
      this.dataUser.email = res.user.email
      this.dataUser._id_Cpt = res.user.compteBancaire._id
      this.dataUser.Solde_Cpt = res.user.compteBancaire.Solde_Cpt
      this.dataUser.Type_Cpt = res.user.compteBancaire.Type_Cpt
      this.dataUser.isAdmin = res.user.isAdmin
      this.dataUser.role = res.user.role


      console.log(res)


    })

  }
  deleteMyAccount() {
    this.userService.deleteMyAccount().subscribe((res: any) => {
      localStorage.removeItem('TokenCompteBancaire')
      window.location.reload()
      this.toastr.success(res.message, '', {
        timeOut: 3000,
      });
    })
  }
}
