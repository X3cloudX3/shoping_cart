import { Component, OnInit } from '@angular/core';
import { routes } from "../../appRouting/appRouting.utils"
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  mainRoutes
  constructor() {
    this.mainRoutes = routes

  }

  ngOnInit() {
  }

}
