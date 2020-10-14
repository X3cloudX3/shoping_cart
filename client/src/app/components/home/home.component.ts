import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public guest: Boolean
  public pageToShow: String
  constructor(public userService: UserService) {
    this.guest = localStorage.getItem("token") ? false : true
    this.pageToShow = "Login"
  }

  showLoginPage() {
    this.pageToShow = "Login"
  }

  showRegisterOnePage() {
    this.pageToShow = "Register"
  }

  showRegisterTwoPage() {
    this.pageToShow = "Register2"
  }

}
