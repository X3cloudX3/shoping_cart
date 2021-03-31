import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from "../../services/user/user.service"
import { Router } from "@angular/router"
import { CartService } from 'src/app/services/cart/cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email: string
  password: string
  message: string
  cartID: string
  @ViewChild('content', { static: false }) content: TemplateRef<any>;
  constructor(public userService: UserService, public router: Router, public cartService: CartService, private modalService: NgbModal) {
    this.email = ""
    this.password = ""
    this.message = ""
    this.cartID = ""
  }

  ngOnInit() { }
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
          this.cartService.getCartDetails().subscribe({
            next: (result: any) => {
              if (result.products.length > 0) {
                this.cartID = result._id;
                this.modalService.open(this.content);
              } else {
                this.router.navigate(["/products"])
              }
            },
            error: (error: any) => {
              console.log('Got error:', error);
              this.router.navigate(["/products"])
            }
          });

        }
      }
    })
  }

  deleteCart() {
    this.cartService.deleteCart(this.cartID).subscribe(res => {
      if (res) {
        this.cartService.setCartSize(res.products.length)
        this.modalService.dismissAll()
        this.router.navigate(["/products"])
      } else {
        this.modalService.dismissAll()
        this.router.navigate(["/products"])
      }
    })
  }

  dontChange() {
    this.modalService.dismissAll()
    this.router.navigate(["/products"])
  }
}




