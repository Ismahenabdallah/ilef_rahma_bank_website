import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  url = environment.urlBackend


  constructor(private http: HttpClient) { }
  token: any = localStorage.getItem('token')
  header = new HttpHeaders().set('authorization', this.token)


  createCompte(profil: any) {

    return this.http.post(`${this.url}/compte/add`, profil, { headers: this.header })

  }

  findMyAccount() {
    return this.http.get(`${this.url}/compte/find`, { headers: this.header })
  }
  updateMyAccount(newUser: any) {
    return this.http.patch(`${this.url}/compte/update/`, newUser, { headers: this.header })
  }

  deleteMyAccount() {
    return this.http.delete(`${this.url}/compte/delete/`, { headers: this.header })
  }

}
