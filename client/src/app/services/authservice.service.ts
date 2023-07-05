import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  url = environment.urlBackend;

  helper = new JwtHelperService();
  role = ""
  profil = {
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    compteBancaire: "",
    creditDemande: "",
    TokenCompteBancaire: "",
    CIN: "",
    isAdmin: "",
    role: "",
  };
  constructor(
    private http: HttpClient,
    private r: Router,
    private toastr: ToastrService,
    private arouter: ActivatedRoute,

  ) { }

  login(data: any) {
    return this.http.post(`${this.url}/auth/login`, data);
  }
  saveData(token: any) {
    localStorage.setItem('token', token);
    let decodeToken = this.helper.decodeToken(token);
    if (decodeToken.TokenCompteBancaire)
      return localStorage?.setItem("TokenCompteBancaire", decodeToken.TokenCompteBancaire)

  }

  getProfile() {
    let token: any = localStorage.getItem('token');
    let decodeToken = this.helper.decodeToken(token);
    this.profil._id = decodeToken._id;
    this.profil.email = decodeToken.email;
    this.profil.firstName = decodeToken.firstName;
    this.profil.lastName = decodeToken.lastName;
    this.profil.compteBancaire = decodeToken.compteBancaire;
    this.profil.creditDemande = decodeToken.creditDemande;
    this.profil.CIN = decodeToken.CIN;
    this.profil.isAdmin = decodeToken.isAdmin;
    this.profil.role = decodeToken.role;
    this.profil.TokenCompteBancaire = decodeToken.TokenCompteBancaire;

    //console.log(decodeToken)

    return this.profil;
  }




  getRole() {
    let token: any = localStorage.getItem('token');
    if (token) {
      let decodeToken = this.helper.decodeToken(token);
      this.role = decodeToken.role


    }
    return this.role
  }

  verifRole() {
    let token: any = localStorage.getItem('token');
    if (token) {
      let decodeToken = this.helper.decodeToken(token);
      if (decodeToken?.role === 'Admin') {


        return this.r.navigate(['/admin'])
      }
      if (decodeToken?.role === 'User') {

        return this.r.navigate(['/user'])
      }

    }












    return true
  }


  LoggedIn() {
    let token: any = localStorage.getItem('token')



    if (!token) {
      return false
    }
    let expire = this.helper.isTokenExpired(token)

    if (expire) {
      return false
    }

    return true
  }

  guardAUthAdmin() {
    let token: any = localStorage.getItem('token');
    let decodeToken = this.helper.decodeToken(token);

    if (decodeToken.role !== "Admin") {
      return false

    }
    return true

  }
  guardAUthUser() {
    let token: any = localStorage.getItem('token');
    let decodeToken = this.helper.decodeToken(token);


    if (decodeToken.role !== "User") {
      return false

    }
    return true

  }
  register(data: any) {
    return this.http.post(`${this.url}/auth/register`, data);
  }



}

