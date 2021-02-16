import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';

const baseUrl = "http://localhost:4000"

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(public http: HttpClient) {
  }
  addToCart(category: string, imageURL: string, name: string, price: number, priceWithAmount: number, amount: number): Observable<any> {
    return (this.http.post(`${baseUrl}/cart/addToCart`, { imageURL, category, name, price, amount, priceWithAmount }))
  }
  getCartDetails(): Observable<any> {
    return this.http.get(`${baseUrl}/cart/getCartDetails`)
  }
}




