import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ProductsService } from '../../../../services/products/products.service'
@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: './edit-modal.component.html'
})
export class EditModalComponent implements OnInit {
  @Input() product
  checkoutForm: any;
  errors: any
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.checkoutForm = this.formBuilder.group({
      id: new FormControl(this.product._id),
      imageURL: new FormControl(this.product.imageURL),
      name: new FormControl(this.product.name),
      category: new FormControl(this.product.category),
      price: new FormControl(this.product.price)
    });
    this.errors = {
      imageError: "",
      nameError: "",
      categoryError: "",
      priceError: "",
    }
  }

  closeResult = '';


  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public productService: ProductsService) {

  }

  open(content) {
    this.resetErrors()
    this.productService.clearProduct()
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onSubmit(productEditValue) {
    this.resetErrors()
    const { imageURL, name, category, price } = productEditValue
    if (!imageURL) return this.errors.imageError = "image is required."
    if (!name) return this.errors.nameError = "name is required."
    if (!category) return this.errors.categoryError = "category is required."
    if (price <= 0) return this.errors.priceError = "price must be above 0 ."
    this.productService.editProducts(productEditValue).subscribe((res) => {
      if (res) {
        this.productService.sendProduct(res)
      } else {
        alert('product was not saved')
      }
    })
    this.modalService.dismissAll()
  }


  resetErrors() {
    this.errors = {
      imageError: "",
      nameError: "",
      categoryError: "",
      priceError: "",
    }
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