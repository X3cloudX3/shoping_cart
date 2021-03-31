import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductsService } from "../../../../services/products/products.service"

@Component({
  selector: 'app-admin-product-item',
  templateUrl: './admin-product-item.component.html',
  styleUrls: ['./admin-product-item.component.css']
})
export class AdminProductItemComponent implements OnInit {
  constructor(public productsService: ProductsService) {
  }
  @Input() product
  @Output() passtoParent = new EventEmitter<any>();

  ngOnInit() {
  }
  onChanged(changed: string) {
    changed === 'product was edited' ? this.passtoParent.emit(changed) : this.passtoParent.emit('')
  }
}

