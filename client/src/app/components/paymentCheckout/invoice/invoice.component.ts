import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { jsPDF } from "jspdf"
import html2canvas from 'html2canvas';
import { CartService } from 'src/app/services/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  cart: any
  ccType: string
  creditCard: string
  city: string
  street: string
  orderDate: string
  orderID: string
  totalPrice: Number
  vat: number
  subtotal: number
  fullName: string
  email: string
  shippingDate: string
  @ViewChild('htmlData', { static: false }) htmlData: ElementRef;

  initForm() {
    this.cart = []
    this.ccType = ''
    this.creditCard = ''
    this.city = ''
    this.street = ''
    this.orderDate = ''
    this.orderID = ''
    this.totalPrice = 0
    this.vat = 0
    this.subtotal = 0
    this.orderDate = ""
    this.fullName = ""
    this.email = ""
    this.shippingDate = ""
  }
  ngOnInit() {
    this.initForm()
    this.getInvoiceData()
  }
  constructor(public checkoutService: CheckoutService, public cartService: CartService, public router: Router) { }

  getInvoiceData() {
    this.checkoutService.getInvoice().subscribe(res => {
      const { cart, checkout, creditCard, orderDate, fullName, email, dateToShip } = res
      const { _id, street, city, ccType } = checkout
      this.cart = cart.products
      this.ccType = ccType
      this.creditCard = creditCard
      this.city = city
      this.street = street
      this.orderDate = orderDate
      this.orderID = _id
      this.totalPrice = cart.reduce((acc, item) => acc + item.priceWithAmount, 0)
      this.calcVatAndPrice(this.totalPrice)
      this.orderDate = orderDate
      this.fullName = fullName
      this.email = email
      this.shippingDate = dateToShip
    })
  }
  calcVatAndPrice(fullPrice) {
    this.subtotal = fullPrice / 1.17
    this.vat = (fullPrice - this.subtotal)
  }
  public openPDF(): void {
    let DATA = document.getElementById('htmlData');

    html2canvas(DATA).then(canvas => {
      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;
      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
      PDF.save('invoice.pdf');
    });
  }

  backToShopping() {
    this.cartService.deleteCart(this.cart._id).subscribe(res => {
      if (res) {
        this.cartService.setCartSize(res.products.length)
        this.checkoutService
        this.router.navigate(["/products"])
      } else {
        alert('somthing went wrong')
      }
    })
  }
}
