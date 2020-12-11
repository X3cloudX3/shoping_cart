import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-admin-products-list',
  templateUrl: './admin-products-list.component.html',
  styleUrls: ['./admin-products-list.component.css']
})
export class AdminProductsListComponent implements OnInit {
  public products
  public selectedCategory
  constructor(public productsService: ProductsService) {
    this.products = []
  }


  ngOnInit() {
    this.getData()
  }

  getData() {
    this.productsService.getProducts().subscribe((res) => {
      this.products = res.result
    })
  }
  onAddSave(save: string) {
    save === 'product saved' ? this.getData() : alert('product was not saved')
  }

  onChanged(changed: string) {
    if (changed === 'product was edited') {
      this.getData()
    }
  }
}
