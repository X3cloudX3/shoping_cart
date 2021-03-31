import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  public products: Array<any>
  categories: Array<any>
  public sel: any
  constructor(public productsService: ProductsService) {
    this.products = []
    this.sel = 0
  }

  ngOnInit() {
    this.productsService.getProducts().subscribe((res) => {
      this.products = res.result
      this.categories = this.products.filter((item, index, array) => {
        return array.map((mapItem) => mapItem['category']).indexOf(item['category']) === index
      })
    })
  }

}
