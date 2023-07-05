import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from './services/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

  title = 'bank_website';
  constructor(public router: Router  , public auth: AuthserviceService) { }
}
