import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from "../../../services/products/products.service"
@Component({
  selector: 'app-admin-product-item',
  templateUrl: './admin-product-item.component.html',
  styleUrls: ['./admin-product-item.component.css']
})
export class AdminProductItemComponent implements OnInit {
  constructor(public productsService: ProductsService) { }
  @Input() product
  ngOnInit() {
  }
  editProduct() {
    this.productsService.editProducts(this.product).subscribe()
      ;
  }
}

