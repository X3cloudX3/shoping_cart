import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
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
  date: string;
  minDate: string
  creditCard: number;
  errors: any;
  ccType: string
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
    this.minDate = ""
    this.creditCard = 0
    this.errors = {
      cityError: "",
      streetError: "",
      dateError: "",
      creditCardError: "",
    }
    this.ccType = ""
  }

  constructor(private formBuilder: FormBuilder, public cartService: CartService, public router: Router, public userService: UserService, public checkoutService: CheckoutService) { }


  getCartDetails() {
    this.cartService.getCartDetails().subscribe(res => {
      this.cart = res.products
      this.itemsAmount = res.products.reduce((acc, item) => acc + item.amount, 0);
      this.totalCost = res.products.reduce((acc, item) => acc + item.priceWithAmount, 0)
    })
  }
  backToShop() {
    this.cartService.isCartHidden(false)
    this.router.navigate(["/products"])
  }

  getUserDetails() {
    this.userService.getUserDetails().subscribe((res) => {
      const { city, street, minDate } = res
      this.city = city
      this.street = street
      this.minDate = minDate
      this.date = minDate

    })
  }
  handleErrors(city, street, date, creditCard) {
    this.resetErrorsAndSucsses()
    if (!city) return this.errors.cityError = "city is required."
    if (!street) return this.errors.streetError = "street is required."
    if (this.checkDate(date)) return
    if (!creditCard) return this.errors.creditCardError = "credit card is required."
    if (!this.cardREGEX(creditCard)) return

    return false
  }

  resetErrorsAndSucsses() {
    this.errors = {
      cityError: "",
      streetError: "",
      dateError: "",
      creditCardError: "",
    }
    this.ccType = ""
  }

  checkout() {
    const { cart, itemsAmount, totalCost, city, street, date, creditCard, ccType } = this
    if (this.handleErrors(city, street, date, creditCard)) {
      return
    }
    this.checkoutService.checkout(city, street, date, creditCard).subscribe(res => {
      if (res.encryptedCC != 'false') {
        this.router.navigate(["/invoice"])
      }
    })

  }

  cardREGEX(cc) {
    if (/^4580+[0-9]{12}$|^4557+[0-9]{12}$/.test(cc)) {
      return this.ccType = "visa"
    }
    if (/^5326(1003)[0-9]{8}$|^5326(1011)[0-9]{8}$|^5326(1012)[0-9]{8}$|^5326(1013)[0-9]{8}$|^5326(1014)[0-9]{8}$|^5326(1103)[0-9]{8}$/.test(cc)) {
      return this.ccType = "master card by isracard"
    }
    if (/^5189(54)+[0-9]{10}$|5189(89)+[0-9]{10}$|5189(46)+[0-9]{10}$|5189(06)+[0-9]{10}$|5189(07)+[0-9]{10}$|5189(83)+[0-9]{10}$/.test(cc)) {
      return this.ccType = "master card by cal"
    }

    if (/^1[0-9]{1,12}$|^2[0-9]{1,12}$|^2[0-9]{1,12}$|^6[0-9]{1,12}$|^7[0-9]{1,12}$|^8[0-9]{1,12}$|^9[0-9]{1,12}$/.test(cc)) {
      return this.ccType = "private 12 digits card"
    }
    if (/^36[0-9]{14}/.test(cc)) {
      return this.ccType = "diners"
    }
    if (/^3755[0-9]{12}/.test(cc)) {
      return this.ccType = "american express"
    }
    return (this.errors.creditCardError = "we do not except this credit card", false)
  }

  checkDate(date) {
    if (!date) {
      return this.errors.dateError = "please choose a delivery date"
    }
    if (date < this.minDate) {
      return this.errors.dateError = "please choose a valid delivery date"
    }
    return false
  }

}
