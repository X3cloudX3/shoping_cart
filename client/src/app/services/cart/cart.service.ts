import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable, Subject } from 'rxjs';

const baseUrl = "http://localhost:4000"

@Injectable({
  providedIn: 'root'
})
export class CartService {
  subject = new Subject()
  cartSize: Number
  constructor(public http: HttpClient) {
    this.cartSize = 0
  }
  addToCart(category: string, imageURL: string, name: string, price: number, priceWithAmount: number, amount: number): Observable<any> {
    return (this.http.post(`${baseUrl}/cart/addToCart`, { imageURL, category, name, price, amount, priceWithAmount }))
  }
  getCartDetails(): Observable<any> {
    return this.http.get(`${baseUrl}/cart/getCartDetails`)
  }
  deleteFromCart(item): Observable<any> {
    return this.http.post(`${baseUrl}/cart/deleteFromCart`, { item })
  }
  editFromCart(item): Observable<any> {
    return this.http.post(`${baseUrl}/cart/editItemFromCart`, { item })
  }

  setCartSize(size) {
    this.cartSize = size
  }

}




