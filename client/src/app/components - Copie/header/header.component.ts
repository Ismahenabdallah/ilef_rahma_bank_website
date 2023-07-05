import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { AuthserviceService } from 'src/app/services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  refresh: boolean = false
  constructor(@Inject(DOCUMENT) private document: Document, public share: AuthserviceService, private r: Router) {
    //console.log(share.profil)
    if (this.checkLocalStorage('TokenCompteBancaire')) {
      this.refresh = true;
    }



  }
  checkLocalStorage(key: string): boolean {
    const value = localStorage.getItem(key);
    return value !== null && value !== '' && value !== 'undefined';
  }

  ngOnInit(): void {
  }
  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

  logout() {
    localStorage.clear()
    this.r.navigate(['/login'])
  }
}
