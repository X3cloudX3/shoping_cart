import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-routes-links',
  templateUrl: './routes-links.component.html',
  styleUrls: ['./routes-links.component.css']
})
export class RoutesLinksComponent implements OnInit {
  @Input() routes
  @Input() prefix
  public username: String
  public cartSize: Number
  public role: String
  constructor(public userService: UserService, public router: Router) {
    this.username = "Guest"
    this.cartSize = 100
    this.role = "guest"
  }

  ngOnInit() {
    this.userService.getDetails().subscribe(res => {
      console.log(res);
      this.username = res.fullName
      this.role = res.role
    })
    this.userService.getUserDetails().subscribe((res) => {
      this.username = res.fullName ? res.fullName : "Guest"
      this.role = res.role ? res.role : "guest"
      if (res.status === false) localStorage.setItem("token", "")
      this.userService.setName(res.fullName)
    })
  }
  signOut() {
    localStorage.setItem("token", "")
    this.role = "guest"
    this.username = "Guest"
    this.router.navigate(["/home"])
  }
}
