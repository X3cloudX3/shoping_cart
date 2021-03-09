import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = "http://localhost:4000"
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(public http: HttpClient) { }

  checkout(city: string, street: string, date: string, creditCard: number): Observable<any> {
    return this.http.post(`${baseUrl}/checkout/finishCheckout`, { city, street, date, creditCard })
  }
  getInvoice(): Observable<any> {
    return this.http.get(`${baseUrl}/checkout/getInvoiceDetails`)
  }
}
