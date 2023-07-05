import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

//import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  url = environment.urlBackend


  constructor(private http: HttpClient) { }
  token: any = localStorage.getItem('token')
  header = new HttpHeaders().set('authorization', this.token)
  // register(body: any) {
  //   return this.http.post(`${this.url}/register`, body)
  // }

  // login(body: any) {
  //   return this.http.post(`${this.url}/login`, body)
  // }
  getAllusers() {
    return this.http.get(`${this.url}/admin/all`, { headers: this.header })
  }
  addUsers(profil: any) {

    return this.http.post(`${this.url}/admin/add`, profil, { headers: this.header })

  }
  deleteUser(id: any) {
    return this.http.delete(`${this.url}/admin/del/${id}`, { headers: this.header })
  }
  getById(id: any) {
    return this.http.get(`${this.url}/admin/get/${id}`, { headers: this.header })
  }
  updateUser(id: any, newUser: any) {
    return this.http.patch(`${this.url}/admin/update/${id}`, newUser, { headers: this.header })
  }
  // searchUsers(query: any) {
  //   const options = {
  //     headers: this.header,
  //     params: {
  //       query: query
  //     }
  //   };
  //   return this.http.get(`${this.url}/admin/search`, options);
  // }
  // getAllcomptes() {
  //   return this.http.get(`${this.url}/compte/get`)
  // }

}
