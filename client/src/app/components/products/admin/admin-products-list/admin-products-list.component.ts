import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-admin-products-list',
  templateUrl: './admin-products-list.component.html',
  styleUrls: ['./admin-products-list.component.css']
})
export class AdminProductsListComponent implements OnInit {
  public products: Array<any>
  public selectedCategory
  public categories: Array<any>
  public sel: any
  constructor(public productsService: ProductsService) {
    this.products = []
    this.categories = []
    this.sel = 0
  }


  ngOnInit() {
    this.getData()
    this.getDataAfterChange()
  }
  getDataAfterChange() {
    this.productsService.getProduct().subscribe(product => {
      if (product) {
      return  this.getData()
      }
    })
  }
  getData() {
    this.productsService.getProducts().subscribe((res) => {
      this.products = res.result
      this.categories = this.products.filter((item, index, array) => {
        return array.map((mapItem) => mapItem['category']).indexOf(item['category']) === index
      })
    })
  }
}
