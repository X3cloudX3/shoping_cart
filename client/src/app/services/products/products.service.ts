import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable, Subject } from 'rxjs';

const baseUrl = "http://localhost:4000"

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private subject = new Subject<any>();
  constructor(public http: HttpClient) {
  }
  getProducts(): Observable<any> {

    return this.http.get(`${baseUrl}/products/getProducts`)

  }
  sendProduct(product: object) {
    this.subject.next(product);
  }

  clearProduct() {
    this.subject.next();
  }

  getProduct(): Observable<any> {
    return this.subject.asObservable();
  }

  editProducts(product: object): Observable<any> {

    return this.http.post(`${baseUrl}/products/editProduct`, { product })
  }

  addProducts(imageURL: string, name: string, category: string, price: number): Observable<any> {

    return this.http.post(`${baseUrl}/products/addProduct`, { imageURL, name, category, price })

  }

}
