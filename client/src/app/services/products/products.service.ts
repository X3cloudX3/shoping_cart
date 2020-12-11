import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';

const baseUrl = "http://localhost:4000"

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public http: HttpClient) {
  }

  getProducts(): Observable<any> {

    return this.http.get(`${baseUrl}/products/getProducts`)

  }

  editProducts(product: object): Observable<any> {

    return this.http.post(`${baseUrl}/products/editProduct`, { product })
  }

  addProducts(imageURL: string, name: string, category: string, price: number): Observable<any> {

    return this.http.post(`${baseUrl}/products/addProduct`, { imageURL, name, category, price })

  }

}
