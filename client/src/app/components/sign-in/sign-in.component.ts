import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user/user.service"
import { Router } from "@angular/router"

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email
  password
  message
  constructor(public userService: UserService, public router: Router) {
    this.email = ""
    this.password = ""
    this.message = ""
  }

  ngOnInit() {

  }

  signIn() {
    const { email, password } = this
    if (!email || !password) {
      this.message = "Error with one of your fields"
      return
    }
    this.userService.signIn(email, password).subscribe((res) => {
      localStorage.setItem("token", res.token)
      this.message = res.message
      if (res.token) {
        this.userService.setUserDetails(res)
        this.userService.setName(res.name)
        if (res.role === 'admin') {
          this.router.navigate(["/admin/products"])
        } else {
          this.router.navigate(["/products"])
        }
      }
    })
  }
}
