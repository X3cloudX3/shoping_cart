import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';

const baseUrl = "http://localhost:4000/products/"

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public http: HttpClient) {
  }

  getProducts(): Observable<any> {

    return this.http.get(`${baseUrl}getProducts`)

  }

  editProducts(): Observable<any> {

    return this.http.get(`${baseUrl}editProducts`)

  }
  addProducts(): Observable<any> {

    return this.http.get(`${baseUrl}addProducts`)

  }

}
