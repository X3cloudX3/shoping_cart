import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { CartService } from 'src/app/services/cart/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'cart-modal-basic',
  templateUrl: './cart-modal.component.html'
})
export class CartModalComponent implements OnInit {
  @Output() getUpdateStatusChange = new EventEmitter<any>();
  @Input() product
  checkoutForm: any;
  cart: any
  cartSize: number
  amount: number
  totalCost: number
  ngOnInit() {
    this.initForm();
    this.cartDetails()
  }

  initForm() {
    this.cart = []
    this.cartSize = 0
    this.totalCost = 0
  }

  closeResult = '';



  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder, public cartService: CartService, public router: Router) { }

  open(content) {
    this.cartDetails()
    this.modalService.open(content, { size: 'xl', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  cartDetails() {
    this.cartService.getCartDetails().subscribe(res => {
      this.cart = res;
      this.totalCost = res.reduce((acc, item) => acc + item.priceWithAmount, 0)
      this.cartSize = this.cart.length
    })
  }

  amountChanged(item) {
    this.cartService.editFromCart(item).subscribe(res => {
      this.cart = res.products
      this.totalCost = res.products.reduce((acc, item) => acc + item.priceWithAmount, 0)
      this.cartSize = res.products.length
    })
  }

  deleteFromCart(item) {
    this.cartService.deleteFromCart(item).subscribe(res => {
      this.cart = res.products
      this.totalCost = res.products.reduce((acc, item) => acc + item.priceWithAmount, 0)
      this.cartSize = res.products.length
    })
  }
  checkout() {

    this.router.navigate(["/checkout"])
    this.modalService.dismissAll()
  }
  displayOptions(displayDevice) {

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
