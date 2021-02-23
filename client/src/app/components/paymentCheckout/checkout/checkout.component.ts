import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  itemsAmount: number
  cart: Array<any>
  totalCost: number
  searchTerm: string
  city: string
  street: string
  product: any;
  date: any;
  creditCard: number
  ngOnInit() {
    this.initForm()
    this.getCartDetails()
    this.getUserDetails()
  }

  initForm() {
    this.cart = []
    this.itemsAmount = 0
    this.totalCost = 0
    this.city = ""
    this.street = ""
    this.date = ""
    this.creditCard = 0
  }

  constructor(private formBuilder: FormBuilder, public cartService: CartService, public router: Router, public userService: UserService) { }


  getCartDetails() {
    this.cartService.getCartDetails().subscribe(res => {
      this.cart = res
      this.itemsAmount = res.reduce((acc, item) => acc + item.amount, 0);
      this.totalCost = res.reduce((acc, item) => acc + item.priceWithAmount, 0)
    })
  }
  backToShop() {
    this.router.navigate(["/products"])
  }

  getUserDetails() {
    this.userService.getUserDetails().subscribe((res) => {
      const { city, street, todayDate } = res
      this.city = city
      this.street = street
      this.date = todayDate
    })
  }
  checkout() {


  }
}
