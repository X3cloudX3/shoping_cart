import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  amount: number
  userID: number
  searchTerm: string
  constructor(public cartService: CartService, public productsService: ProductsService) { }
  @Input() product
  ngOnInit() {
    this.amount = 1
  }

  addToCart(product: any, amount: number) {
    const { category, imageURL, name, price } = product
    const priceWithAmount = Math.round(price * amount)
    this.cartService.addToCart(category, imageURL, name, price, priceWithAmount, amount).subscribe(res => {
      if (res) {
        this.cartService.getCartDetails().subscribe(res => {
          this.cartService.setCartSize(res.products.length);
        })
      }
    })

    this.amount = 1
  }
}
