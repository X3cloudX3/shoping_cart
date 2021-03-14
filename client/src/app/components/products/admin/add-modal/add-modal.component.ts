import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ProductsService } from '../../../../services/products/products.service'
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'addProduct-modal-basic',
  templateUrl: './add-modal.component.html'
})
export class AddModalComponent {
  @Input() product
  checkoutForm: any;
  imageURL: string
  name: string
  category: string
  price: number
  errors: any
  products: any
  categories: any
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  ngOnInit() {
    this.initForm();
    this.getProducts()
  }

  initForm() {
    this.imageURL = ""
    this.name = ""
    this.category = ""
    this.price = 0
    this.products = []
    this.categories = []
  }

  closeResult = '';


  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public productsService: ProductsService) {
    this.errors = {
      imageError: "",
      nameError: "",
      categoryError: "",
      priceError: "",
    }
  }

  open(content) {
    this.getProducts()
    this.productsService.clearProduct()
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getProducts() {
    this.productsService.getProducts().subscribe((res) => {
      this.products = res.result
      const filterdCategories = this.products.filter((item, index, array) => {
        return array.map((mapItem) => mapItem['category']).indexOf(item['category']) === index
      })
      this.categories = filterdCategories.map(item => item.category);
    })
  }
  addProduct() {
    const { imageURL, name, category, price } = this
    if (this.handleErrors(imageURL, name, category, price)) {
      return
    }
    this.productsService.addProducts(imageURL, name, category, price).subscribe((res) => {
      if (res) {
        this.productsService.sendProduct(res)
      } else {
        alert('product was not saved')
      }
    })
    this.modalService.dismissAll()
  }

  search = (text$: Observable<string>) => {
    this.getProducts()
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const inputFocus$ = this.focus$;
    return merge(debouncedText$, inputFocus$,).pipe(
      map(term => (term === '' ? this.categories
        : this.categories.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  handleErrors(imageURL, name, category, price) {
    this.resetErrors()
    if (!imageURL) return this.errors.imageError = "image is required."
    if (!name) return this.errors.nameError = "name is required."
    if (!this.isNameExist(name)) return
    if (!category) return this.errors.categoryError = "category is required."
    if (!this.isCategoryExist(category)) return
    if (price <= 0) return this.errors.priceError = "price must be above 0 ."
    return false
  }

  resetErrors() {
    this.errors = {
      imageError: "",
      nameError: "",
      categoryError: "",
      priceError: "",
    }
  }

  isNameExist(name) {
    const { products } = this
    const productName = products.filter(product => {
      product.name = product.name.replace(/\s/g, '').toLowerCase();
      name = name.replace(/\s/g, '').toLowerCase();
      return product.name === name
    });
    if (productName.length > 0) {
      return this.errors.nameError = `name already exsist.`
    } else {
      return false
    }
  }

  isCategoryExist(category) {
    const { products } = this
    const categoryName = products.filter(product => {
      product.category = product.category.replace(/\s/g, '').toLowerCase();
      category = category.replace(/\s/g, '').toLowerCase();
      return product.category === category
    });
    if (categoryName.length > 0) {
      return this.errors.categoryError = `category already exsist.`
    } else {
      return false
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