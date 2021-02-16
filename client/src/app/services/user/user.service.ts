import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable, Subject } from "rxjs"
const baseURL = "http://localhost:4000"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  name: string
  subject = new Subject()
  private userPartOneDetails: any
  private userPartTwoDetails: any
  constructor(public http: HttpClient) {
    this.name = ""
    this.userPartOneDetails = {
      id: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
    this.userPartTwoDetails = {
      firstName: "",
      lastName: "",
      city: "",
      street: ""
    }
  }

  getUserDetails(): Observable<any> {
    return this.http.get(`${baseURL}/users/getUserDetails`)
  }

  getDetails(): Observable<any> {
    return this.subject.asObservable()

  }
  setUserDetails(details) {
    this.subject.next(details)
  }


  signUp(): Observable<any> {
    console.log('part one', this.userPartOneDetails);
    console.log('part two', this.userPartTwoDetails);
    return this.http.post(`${baseURL}/users/register`, { ...this.userPartOneDetails, ...this.userPartTwoDetails })
  }
  signIn(email: string, password: string): Observable<any> {
    return this.http.post(`${baseURL}/users/login`, { email, password })
  }

  saveUserPartOneDetails(userPartOneDetails: any) {
    this.userPartOneDetails = userPartOneDetails
  }

  saveUserPartTwoDetails(userPartTwoDetails: any) {
    this.userPartTwoDetails = userPartTwoDetails
  }

  getUserPartOneDetails() {
    return this.userPartOneDetails
  }
  checkIfUserAlreadyExists(): Observable<any> {
    const { id, email } = this.userPartOneDetails
    return this.http.post(`${baseURL}/users/checkIfExists`, { id, email })
  }

  setName(name) {
    this.name = name
  }

  getUserId() {
    return this.userPartOneDetails.id
  }

}



