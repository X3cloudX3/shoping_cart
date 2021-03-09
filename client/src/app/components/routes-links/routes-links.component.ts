import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';


@Component({
  selector: 'app-routes-links',
  templateUrl: './routes-links.component.html',
  styleUrls: ['./routes-links.component.css']
})
export class RoutesLinksComponent implements OnInit {
  @Input() routes
  @Input() prefix

  @ViewChild('content', { static: false }) content: TemplateRef<any>;

  public username: String
  public role: String
  public closeCart: boolean
  constructor(public userService: UserService, public checkoutService: CheckoutService, public cartService: CartService, private modalService: NgbModal, public router: Router) {
    this.username = "Guest"
    this.role = "guest"
    this.closeCart = false
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
      this.cartService.getCartDetails().subscribe(res => {
        if (res && this.role != 'guest') {
          this.modalService.open(this.content);
        }
      })
    })

  }
  signOut() {
    localStorage.setItem("token", "")
    this.role = "guest"
    this.username = "Guest"
    this.router.navigate(["/home"])
  }


}
