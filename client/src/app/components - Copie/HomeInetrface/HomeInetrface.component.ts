import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-HomeInetrface',
  templateUrl: './HomeInetrface.component.html',
  styleUrls: ['./HomeInetrface.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }

}
