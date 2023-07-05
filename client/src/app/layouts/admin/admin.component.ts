import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
 constructor(public share:AuthserviceService ,private r:Router){
//  hedi badelnaha b guard router canActivate
// this.share.LoggedIn()
// if(this.share.LoggedIn()==false){

//   this.r.navigate(['/login'])
//   console.log(this.share.LoggedIn())}

 }
 logout(){
  localStorage.removeItem('token')
  this.r.navigate(['/login'])
}
}
