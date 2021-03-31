import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from "../../services/user/user.service"
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public registerStepOne: any
  public errors: any
  public nextButtonError: any
  public userPartOneDetails: any
  // @Input() handlePage: any  
  @Output() handlePages = new EventEmitter()
  constructor(public userService: UserService, public router: Router, public fb: FormBuilder) {
    this.errors = {
      idError: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      userExistsError: ""
    }

    this.userPartOneDetails = this.userService.getUserPartOneDetails()
    this.nextButtonError = true
    this.registerStepOne = this.fb.group(this.userPartOneDetails)
  }

  ngOnInit() {
    this.registerStepOne.valueChanges.subscribe((registerStepOneDetails) => {
      const { email, password, confirmPassword, id } = registerStepOneDetails
      this.handleErrors(registerStepOneDetails)
      this.userService.saveUserPartOneDetails(registerStepOneDetails)
      if (!email || !password || !confirmPassword || !id) return this.nextButtonError = true
      return this.nextButtonError = false
    })
  }

  moveToStepTwo() {
    if (!this.handleErrors(this.registerStepOne.value)) {
      this.userService.checkIfUserAlreadyExists().subscribe((res) => {
        if (res) return this.handlePages.emit()
        return this.errors.userExistsError = "Id or email already exists."
      })
    }
  }
  
  handleErrors(details) {
    const { email, password, confirmPassword, id } = details
    this.resetErrors()
    if (!id) return this.errors.idError = "ID is required."
    if (!email) return this.errors.emailError = "Email is required."
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) return this.errors.emailError = "Email is not valid."
    if (!password) return this.errors.passwordError = "Password is required."
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) return this.errors.passwordError = "password is too weak ."
    if (!confirmPassword) return this.errors.confirmPasswordError = "Confirm Password is required."
    if (password !== confirmPassword) return this.errors.confirmPasswordError = "Passwords not match."
    return false
  }

  resetErrors() {
    this.errors = {
      idError: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: ""
    }
  }
}