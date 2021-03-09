import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ProductsService } from '../../../../services/products/products.service'
@Component({
  selector: 'addProduct-modal-basic',
  templateUrl: './add-modal.component.html'
})
export class AddModalComponent {
  @Output() addProductStatusUpdate = new EventEmitter<string>();
  @Input() product
  checkoutForm;
  imageURL: string
  name: string
  category: string
  price: number
  errors: any
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.imageURL = ""
    this.name = ""
    this.category = ""
    this.price = 0
  }

  closeResult = '';


  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public productService: ProductsService) {
    this.errors = {
      imageError: "",
      nameError: "",
      categoryError: "",
      priceError: "",
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  addProduct() {
    const { imageURL, name, category, price } = this
    if (!imageURL || !name || !category || !price) {
      return
    }
    this.productService.addProducts(imageURL, name, category, price).subscribe((res) => {
      console.log(res.message);
      if (res.message) {
        this.addProductStatusUpdate.emit(res.message)
      }

    })
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